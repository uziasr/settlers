import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        background: "black",
        color: "white"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DCDialog({ open, setOpen, dc }) {


    const handleClose = () => {
        setOpen(false);
    };

    const dcDescriptions = {
        "Knight": "Move the robber. Steal 1 resource from the owner of a settlement or city adjacent to the robber's new hex.",
        "Victory Point": "Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        "Year of Plenty": "Take any 2 resources from the bank. Add them to your hand. They can be 2 of the same resources or 2 different resources.",
        "Road Builder": "Place 2 new roads as if you had just built them.",
        "Monopoly": "When you play this card, announce 1 type of resource. All other players must give you all of their resources of that type."
    }

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dc ? dc.type : null}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{dcDescriptions[dc.type]}</Typography>
                </DialogContent>
                <DialogContent style={{margin: "0 auto"}}>
                    <img src={dc.img}></img>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Use Card
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}