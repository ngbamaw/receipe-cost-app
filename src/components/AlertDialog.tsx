import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    open: boolean;
    description: string;
    title: string;
    onClose: () => void;
    onValidate: () => void;
    onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    description,
    title,
    onClose,
    onValidate,
    onCancel,
    open,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} autoFocus>
                    Annuler
                </Button>
                <Button onClick={onValidate}>Accepter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
