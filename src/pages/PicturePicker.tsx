import React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import FolderIcon from '@mui/icons-material/Folder';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { IconButton, ListItemButton, TextField } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop } from 'react-image-crop';

const urlRegex =
    'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)';

const isReady = async (image: HTMLImageElement) => {
    return new Promise<void>((resolve) => {
        image.onload = () => {
            resolve();
        };
    });
};

async function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<Picture> {
    const canvas = document.createElement('canvas');
    image.crossOrigin = 'anonymous';
    await isReady(image);
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = 'high';

    ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) reject(new Error('Error during convert crop to file'));
                else resolve({ file: new File([blob], 'new.jpg'), src: base64Image });
            },
            'image/jpeg',
            1,
        );
    });
}

export type Picture = { file: File; src: string };

interface PhotoPickerProps {
    onPicture?: (picture: Picture) => void;
    onClose?: () => void;
    open?: boolean;
}

function testImage(url: string, timeoutT?: number) {
    return new Promise(function (resolve, reject) {
        const timeout = timeoutT || 5000;
        const img = new Image();
        const timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = '//!!!!/test.jpg';
            reject('timeout');
        }, timeout);
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject('error');
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve('success');
        };
        img.src = url;
    });
}

const PicturePicker: React.FC<PhotoPickerProps> = ({ onPicture, open = false, onClose }) => {
    const imgRef = React.useRef<HTMLImageElement>();
    const [crop, setCrop] = React.useState<any>({
        aspect: 1,
        unit: '%',
        width: 50,
    });
    const [src, setSrc] = React.useState('');
    const [textLink, setTextLink] = React.useState('');
    const [openTextLink, setOpenTextLink] = React.useState(false);
    const [errorTextLink, setErrorTextLink] = React.useState(false);

    const [completedCrop, setCompletedCrop] = React.useState<Crop | null>(null);
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setSrc(reader.result as string));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleValidation = async () => {
        if (!completedCrop || !imgRef.current) {
            return;
        }

        onPicture?.(await getCroppedImg(imgRef.current, completedCrop));
        setSrc('');
        onClose?.();
    };

    const handleCancel = () => {
        setSrc('');
    };

    const onValidateLink = async () => {
        try {
            await testImage(textLink);
            setErrorTextLink(false);
            setOpenTextLink(false);
            setSrc(textLink);
            setTextLink('');
        } catch (e) {
            setErrorTextLink(true);
        }
    };

    const onCancelLink = () => {
        setOpenTextLink(false);
        setErrorTextLink(false);
        setTextLink('');
    };

    const onLoad = React.useCallback((img) => {
        imgRef.current = img;
    }, []);

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <List sx={{ pt: 0 }}>
                    <ListItemButton onClick={() => setOpenTextLink(true)}>
                        <ListItemAvatar>
                            <Avatar>
                                <InsertLinkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Insérer un lien" />
                    </ListItemButton>
                    <ListItemButton component="label">
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Choisir une image" />
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={onSelectFile}
                        />
                    </ListItemButton>
                </List>
            </Dialog>
            <Dialog open={openTextLink} onClose={() => setOpenTextLink(false)}>
                <TextField
                    value={textLink}
                    onChange={(e) => setTextLink(e.target.value)}
                    variant="outlined"
                    inputProps={{
                        pattern: urlRegex,
                    }}
                    error={errorTextLink}
                />
                <div className="action-line">
                    <IconButton onClick={onValidateLink}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={onCancelLink}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Dialog>
            <Dialog fullScreen open={Boolean(src)}>
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        onImageLoaded={onLoad}
                        imageStyle={{ maxHeight: '80vh' }}
                    />
                    <div className="action-line">
                        <IconButton onClick={handleValidation}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default PicturePicker;
