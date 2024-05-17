import { Button } from "@mui/material";
import { UseDrawerContext } from "../shared/contexts";

export default function Root() {
    const { toggleDrawerOpen } = UseDrawerContext();
    return (
      <>
        <Button variant="contained" color="primary" onClick={ toggleDrawerOpen }>Toggle Drawer</Button>
      </>
    );
  }
  