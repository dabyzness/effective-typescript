import Button from "@mui/material/Button";

export interface MyButtonProps {
  buttonName: string;
  handleButtonClick: () => void;
}

const MyButton = (props: MyButtonProps) => {
  return (
    <Button color="primary" onClick={() => props.handleButtonClick()}>
      {props.buttonName}
    </Button>
  );
};

export default MyButton;
