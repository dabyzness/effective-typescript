import "./ItemView.module.css";
import { Card, CardHeader, CardMedia } from "@mui/material";
import { Product } from "./Products";

export interface ItemView extends Product {
  onItemClicked(id: number): void;
}

const ItemView = (props: ItemView) => {
  function onItemClicked() {
    props.onItemClicked(props.id);
  }

  return (
    <div className="item-view-card">
      <Card onClick={onItemClicked}>
        <CardHeader title={props.name} subheader={props.type} />
        <CardMedia className="card-media-image" image={props.image} />
      </Card>
    </div>
  );
};

export default ItemView;
