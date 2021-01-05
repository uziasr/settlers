import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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


const YearOfPlenty = ({ yearOfPlentyInputs, setYearOfPlentyInputs }) => {

    const plentyChangeHandler = (e) => {
        const value = Number(e.target.value)
        const currentTotal = Object.keys(yearOfPlentyInputs).reduce((acc, resource) => {
            return acc + yearOfPlentyInputs[resource]
        }, 0)
        if (currentTotal >= 2 && value >= 1 && yearOfPlentyInputs[e.target.name] == 0) {
            return
        }
        if ((value === 1 || value === 2 || value === 0)) {
            setYearOfPlentyInputs({ ...yearOfPlentyInputs, [e.target.name]: Number(e.target.value) })
        }
    }

    return (
        <div>
            <div className="resourceCard">🌲</div>
            <TextField
                label="Wood"
                name="wood"
                type="number"
                value={yearOfPlentyInputs["wood"]}
                onChange={(e) => plentyChangeHandler(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="resourceCard">🧱</div>
            <TextField
                label="Brick"
                type="number"
                name="brick"
                value={yearOfPlentyInputs["brick"]}
                onChange={(e) => plentyChangeHandler(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="resourceCard">🌾</div>
            <TextField
                label="Hay"
                type="number"
                name="hay"
                value={yearOfPlentyInputs["hay"]}
                onChange={(e) => plentyChangeHandler(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="resourceCard">🐑</div>
            <TextField
                label="Sheep"
                type="number"
                name="sheep"
                value={yearOfPlentyInputs["sheep"]}
                onChange={(e) => plentyChangeHandler(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="resourceCard"><span style={{ color: "black" }}>⛏</span></div>
            <TextField
                label="Mineral"
                type="number"
                name="mineral"
                value={yearOfPlentyInputs["mineral"]}
                onChange={(e) => plentyChangeHandler(e)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}

export default function DCDialog({ open, setOpen, dc, player, developmentCardAction }) {

    const [additionalStep, setAdditionalStep] = useState(null)
    const [yearOfPlentyInputs, setYearOfPlentyInputs] = useState({
        "wood": 0,
        "brick": 0,
        "hay": 0,
        "sheep": 0,
        "mineral": 0
    })

    const [monopolyResource, setMonopolyResource] = useState(null)

    const Monopoly = () => (
        <div>
            <div className="resourceCard">🌲</div>
            <div className="resourceCard">🧱</div>
            <div className="resourceCard">🌾</div>
            <div className="resourceCard">🐑</div>
            <div className="resourceCard"><span style={{ color: "black" }}>⛏</span></div>
        </div>
    )

    const dcDescriptions = {
        "Knight": "Move the robber. Steal 1 resource from the owner of a settlement or city adjacent to the robber's new hex.",
        "Victory Point": "Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        "Year of Plenty": "Take any 2 resources from the bank. Add them to your hand. They can be 2 of the same resources or 2 different resources.",
        "Road Builder": "Place 2 new roads as if you had just built them.",
        "Monopoly": "When you play this card, announce 1 type of resource. All other players must give you all of their resources of that type."
    }

    const handleClose = () => {
        setOpen(false);
        setAdditionalStep(null)
    };

    const cardAction = () => {
        developmentCardAction(dc, yearOfPlentyInputs, monopolyResource)
        handleClose()
    }

    const handleMonopolyAndYear = (dc) => {
        setAdditionalStep(dc.type == "Monopoly" ? "Monopoly" : "Year of Plenty")
        // handleClose()
    }

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dc.type}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>{dcDescriptions[dc.type]}</Typography>
                </DialogContent>
                <DialogContent style={{ margin: "0 auto" }}>
                    {additionalStep === null ? <img src={dc.img}></img> : additionalStep === "Monopoly" ? <Monopoly /> : <YearOfPlenty yearOfPlentyInputs={yearOfPlentyInputs} setYearOfPlentyInputs={setYearOfPlentyInputs} />}
                </DialogContent>
                <DialogActions>
                    {additionalStep === null ?
                        <Button autoFocus onClick={["Monopoly", "Year of Plenty"].includes(dc.type) ? handleMonopolyAndYear : cardAction} color="primary">
                            Use Card
                        </Button>
                        :
                        <Button autoFocus onClick={cardAction} color="primary">
                            {dc.useable ? "Use Card" : "Close"}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}