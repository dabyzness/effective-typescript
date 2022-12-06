import { Box } from "@mui/material";
import { Collection } from "./Products";
import ItemView from "./ItemView";

const CollectionView = (props: Collection) => {
  function handleItemClicked(id: number) {
    console.log(`handleItemClick: ${id}`);
    props.handleItemClicked(id);
  }

  return (
    <Box display="flex" flexWrap="wrap">
      {props.items.map((item) => (
        <ItemView key={item.id} onItemClicked={handleItemClicked} {...item} />
      ))}
    </Box>
  );
};

export default CollectionView;
