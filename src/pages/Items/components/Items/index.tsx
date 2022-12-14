import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Item,
  ItemState,
  addToBasket,
  getItems,
  selectItems,
} from "../../../../features/items/itemSlice";

import { styled } from "@mui/material/styles";
import ItemCard from "./ItemCard";

import Pagination from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import {
  FilterState,
  filterByItemType,
  selectFilters,
} from "../../../../features/filter/filterSlice";
import useResponsive from "../../../../hooks/useResponsive";

const ITEMTYPES = ["mug", "shirt"];

const StyledButton = styled(Button)(() => ({
  textTransform: "lowercase",
}));

export default function Items() {
  const isDesktop = useResponsive("up", "lg");

  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems) as ItemState;
  const filters = useAppSelector(selectFilters) as FilterState;
  const itemType = filters.itemType;

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onClickItemType = (_itemType: string) => {
    if (_itemType === itemType) {
      dispatch(filterByItemType(""));
    } else {
      dispatch(filterByItemType(_itemType));
    }
    dispatch(getItems());
  };

  const onAddToBasket = (item: Item) => {
    console.log("item", item);
    dispatch(addToBasket(item));
  };

  return (
    <Stack spacing={2} px={3}>
      <Stack>
        <Typography>Products</Typography>
      </Stack>
      <Stack spacing={2} direction="row">
        {ITEMTYPES.map((type: string) => {
          return (
            <StyledButton
              key={type}
              onClick={() => onClickItemType(type)}
              variant={itemType === type ? "contained" : "text"}
            >
              {type}
            </StyledButton>
          );
        })}
      </Stack>
      {!isDesktop && (
        <Stack>
          <Pagination />
        </Stack>
      )}
      <Stack sx={{ background: "#fff" }} p={5} direction="row">
        <Grid
          container
          minHeight={"100vh"}
          alignItems="center"
          spacing={isDesktop ? 4 : 10}
          justifyContent="center"
        >
          {items.status === "loading" ? (
            <CircularProgress />
          ) : (
            items.value?.map((item: Item, i: number) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={3}>
                  <ItemCard
                    index={i + 1}
                    onAddToBasket={onAddToBasket}
                    item={item}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Stack>
      <Stack>
        <Pagination />
      </Stack>
    </Stack>
  );
}
