import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  ReactElement,
  Ref,
  useState,
} from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

import { Product } from "./Products";

export interface DetailsProps {
  open: boolean;
  product: Product | null;
  handleClose(): void;
}

const DetailView = (props: DetailsProps) => {
  const [noSwitches, setNoSwitches] = useState<number>(70);

  function handleClose() {
    console.log(`Details: handleClose()`);
    props.handleClose();
  }
  const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setNoSwitches(parseInt(e.target.value));
    console.log(`onChange:
    ${e.target.name} : 
    ${e.target.value}`);
  }

  function onSubmit(e: FormEvent) {
    console.log(`submit: 
    ${noSwitches}`);
    e.preventDefault();
  }

  return (
    <div className="full-screen-details-dialogue">
      <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close></Close>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="details-paper-padding-top">
          <Paper className="details-paper-body">
            <Grid container spacing={5}>
              <Grid item>
                <img
                  className="large-image"
                  src={props.product?.image}
                  alt="urine"
                />
              </Grid>
              <Grid
                item
                xs
                container
                direction="column"
                justifyContent="flex-start"
                align-items="stretch"
              >
                <Grid item>
                  <h1>{props.product?.name}</h1>
                </Grid>
                <Grid item>
                  <h2>{props.product?.type}</h2>
                </Grid>
                <Grid item>
                  <p>{props.product?.longDescription}</p>
                </Grid>
                <Grid item>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Specifiations</TableCell>
                          <TableCell align="right">&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Actuation Force</TableCell>
                          <TableCell>
                            {props.product?.specs?.actuationForce} g
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Actuation Point</TableCell>
                          <TableCell>
                            {props.product?.specs?.actuationPoint} mm
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Bottom Out</TableCell>
                          <TableCell>
                            {props.product?.specs?.bottomOut} g
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Bottom Out Travel</TableCell>
                          <TableCell>
                            {props.product?.specs?.bottomOutTravel} mm
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Price</TableCell>
                          <TableCell>$ {props.product?.specs?.price}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item>&nbsp;</Grid>
                <Grid item>
                  <h3>Order Now :</h3>
                </Grid>
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                  <Grid item>
                    <TextField
                      type="number"
                      name="noSwitches"
                      id="standard-basic"
                      label="No of switches"
                      onChange={onChange}
                      value={noSwitches}
                    />
                  </Grid>
                  <Grid item>&nbsp;</Grid>

                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      Add to Cart
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Dialog>
    </div>
  );
};

export default DetailView;
