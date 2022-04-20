import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function ConfirmModal({ open, handleClose, handleRedeem }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yakin menukar dengan hadiah ini?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Poin kamu tidak akan kembali jika sudah ditukar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Tidak</Button>
        <Button onClick={handleRedeem} autoFocus>
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}
