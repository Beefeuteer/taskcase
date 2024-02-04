"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import { useState } from "react";
import dataSet from "../products/data";

export default function Home() {
  const [data, setData] = useState(dataSet.items);
  const [selectedProductList, setSelectedProductList] = useState(
    dataSet.items.slice(0, 5)
  );

  const [cartTotal, setCartTotal] = useState(0);

  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: 4,
    borderRadius: 2,
  };

  // for open modal delete
  const [openDelete, setOpenDelete] = React.useState(false);
  const [scopedDeletionID, setScopedDeletionID] = React.useState(0);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // for delete
  const handleDelete = (id) => {
    const newSelectedProductList = selectedProductList.filter(
      (product) => product.id !== id
    );
    setSelectedProductList(newSelectedProductList);
  };

  //for box check
  const handleCheckBoxChange = (e) => {
    console.log("e", e);
  };

  const addProduct = (e, product) => {
    console.log("event", product);
    setSelectedProductList([...selectedProductList, product]);
  };

  React.useEffect(() => {
    let subtotal = 0;
    selectedProductList.forEach((product) => {
      if (!isNaN(product.stok_satis) && !isNaN(product.quantity)) {
        subtotal += product.stok_satis * product.quantity;
      }
    });
    setCartTotal(parseInt(subtotal));
  }, [selectedProductList]);

  return (
    <main className="flex flex-col items-center justify-start">
      {/* Add Product Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.full_name}
            getOptionDisabled={(option) => option.m_stok_ilk_stok === 0}
            renderInput={(params) => (
              <TextField {...params} label="Products"></TextField>
            )}
            onChange={(e, product, reason) => {
              addProduct(e, product);
              handleClose();
              console.log("reason", reason);
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      loading="lazy"
                      width="50"
                      src={option.product_image_s}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="font-bold text-md" variant="body2">
                      {option.id}
                    </Typography>
                    <Typography variant="body2">{option.full_name}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography className="font-bold text-xs" variant="body2">
                        Price:{" "}
                      </Typography>
                      <Typography variant="body2 text-xs">
                        {parseInt(option.stok_satis).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Typography>
                    </Box>
                    <Typography
                      className="font-bold"
                      variant="body2"
                      style={{
                        color:
                          option.m_stok_ilk_stok === 0
                            ? "red"
                            : option.m_stok_ilk_stok < 10
                            ? "orange"
                            : "inherit",
                      }}
                    >
                      {"Stock Amount: "}
                      {option.m_stok_ilk_stok === 0
                        ? "Out of stock"
                        : option.m_stok_ilk_stok + " pieces"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          />
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box sx={style}>
          <Typography
            variant="body2"
            id="modal-modal-title"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Would you like to delete the product from the cart?
          </Typography>
          <Box
            className="mt-4"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ButtonGroup size="large" align="right" disableElevation>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {
                  handleDelete(scopedDeletionID);
                  handleCloseDelete();
                  setScopedDeletionID(0);
                }}
              >
                Yes
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleCloseDelete}
              >
                No
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={2} className="w-[100%]">
        <Grid item xs={10}>
          <TableContainer component={Paper} style={{ maxHeight: "700px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 700 }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="font-bold"></TableCell>
                  <TableCell align="center" className="font-bold">
                    ID
                  </TableCell>
                  <TableCell align="center" className="font-bold">
                    Product Name
                  </TableCell>
                  {/*     <TableCell align="center" className="font-bold">
                    Stock Amount
                  </TableCell> */}
                  <TableCell align="center" className="font-bold">
                    Unit Price
                  </TableCell>
                  <TableCell align="center" className="font-bold">
                    Quantity
                  </TableCell>
                  <TableCell align="center" className="font-bold">
                    Box
                  </TableCell>
                  <TableCell align="center" className="font-bold">
                    SubTotal
                  </TableCell>
                  <TableCell align="center" className="font-bold">
                    Update/Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProductList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Your cart is empty
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedProductList.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          loading="lazy"
                          width="90"
                          src={product.product_image_s}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography className="font-bold">
                          {" ["}
                          {product.id}
                          {"]"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Typography
                            title={product.full_name}
                            className="hover:cursor-pointer hover:text-red-500"
                          >
                            {product.full_name.length > 40
                              ? product.full_name.substring(0, 40) + "..."
                              : product.full_name}
                          </Typography>
                          {product.m_stok_diger_bilgiler.map((item) => (
                            <Typography
                              className="text-sm font-bold"
                              key={item.stok_id}
                            >
                              {item.yer_baslik}: {item.stok_adet}
                            </Typography>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          className="text-xl font-bold"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {parseInt(product.stok_satis).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          variant="outlined"
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                          value={product.quantity || 1}
                          onChange={(e) => {
                            const updatedProductList = selectedProductList.map(
                              (p) => {
                                if (p.id === product.id) {
                                  const newQuantity = parseInt(e.target.value);
                                  const maxQuantity = Math.min(
                                    newQuantity,
                                    product.stok_adet
                                  );
                                  return {
                                    ...p,
                                    quantity: maxQuantity,
                                  };
                                }
                                return p;
                              }
                            );
                            setSelectedProductList(updatedProductList);

                            if (
                              parseInt(e.target.value) === 0 ||
                              e.target.value == null ||
                              e.target.value === "" ||
                              isNaN(e.target.value)
                            ) {
                              setScopedDeletionID(product.id);
                              handleOpenDelete();
                            }
                          }}
                          size="small"
                          style={{ width: "75px" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div
                          variant="body2"
                          className="text-xl font-bold"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {product.productBoxQuantitiesCount > 0 ? (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    const updatedProductListCheck =
                                      selectedProductList.map((p) => {
                                        if (p.id === product.id) {
                                          return {
                                            ...p,
                                            boxChecked: e.target.checked
                                              ? 1
                                              : 0,
                                          };
                                        }
                                        return p;
                                      });
                                    setSelectedProductList(
                                      updatedProductListCheck
                                    );
                                  }}
                                />
                              }
                              label="Box?"
                              labelPlacement="start"
                            />
                          ) : (
                            <Typography>No Boxing option</Typography>
                          )}

                          {product.boxChecked === 1 && (
                            <FormControl fullWidth>
                              <InputLabel id="box-selection-label">
                                Box Type
                              </InputLabel>
                              <Select
                                labelId="box-selection-label"
                                id="box-simple-select"
                                value={product.boxQuantity}
                                label="Box Type"
                                onChange={(e) => {
                                  const updatedProductListBox =
                                    selectedProductList.map((p) => {
                                      if (p.id === product.id) {
                                        return {
                                          ...p,
                                          boxType: e.target.value,
                                        };
                                      }
                                      return p;
                                    });
                                  setSelectedProductList(updatedProductListBox);
                                }}
                              >
                                {Object.keys(product.productBoxQuantities).map(
                                  (key) => (
                                    <MenuItem
                                      key={
                                        product.productBoxQuantities[key]
                                          .boxkayit_kutuadet
                                      }
                                      value={
                                        product.productBoxQuantities[key]
                                          .box_fiyat
                                      }
                                    >
                                      {
                                        product.productBoxQuantities[key]
                                          .box_fiyat
                                      }
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          )}
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <div
                          variant="body2"
                          className="text-xl font-bold"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            className={`text-xl font-bold ${
                              product.boxType && product.boxChecked === 1
                                ? "line-through text-red-500"
                                : ""
                            }`}
                          >
                            {parseInt(
                              (product.quantity || 1) * product.stok_satis
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </Typography>

                          <Typography className="text-xl font-bold">
                            {product.boxType && product.boxChecked === 1
                              ? ` ${product.boxType}`
                              : ""}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup size="small">
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                          >
                            Update
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={2}>
          <Box border={1} borderColor="#dadde1" p={1} borderRadius={1}>
            <Button
              size="small"
              onClick={handleOpen}
              variant="outlined"
              color="success"
              fullWidth
              startIcon={<AddIcon />}
            >
              Add Product
            </Button>
          </Box>

          <Typography variant="body1" className="font-bold" mt={4}>
            Coupon Code
          </Typography>
          <Box border={1} borderColor="#dadde1" p={1} borderRadius={1}>
            <TextField
              id="coupon"
              name="coupon"
              label="Enter the coupon code"
              variant="outlined"
              size="small"
              fullWidth
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="small"
                variant="outlined"
                fullWidth
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Apply Coupon
              </Button>
            </div>
          </Box>

          <Typography variant="body1" className="font-bold" mt={4}>
            Proceed to Checkout
          </Typography>

          <Box border={1} borderColor="#dadde1" p={1} borderRadius={1}>
            <Typography
              variant="body2"
              className="font-bold py-3"
              style={{ borderBottom: "1px solid #dadde1" }}
            >
              Cart Total
            </Typography>

            <div
              className="flex flex-row justify-between"
              style={{ borderBottom: "1px solid #dadde1" }}
            >
              <Typography align="left" variant="body2" className="py-3">
                Carts Subtotal:{" "}
              </Typography>

              <Typography variant="body2" className="font-bold py-3">
                {cartTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </div>

            <div
              className="flex flex-row justify-between"
              style={{ borderBottom: "1px solid #dadde1" }}
            >
              <Typography align="left" variant="body2" className="py-3">
                Grand Total:{" "}
              </Typography>

              <Typography variant="body2" className="font-bold py-3">
                {cartTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </div>

            <div
              className="flex flex-row justify-between mt-3"
              style={{ borderBottom: "1px solid #dadde1" }}
            >
              <Typography align="left" variant="body2" className="py-3">
                Main Warehouse subtotal:
              </Typography>

              <Typography variant="body2" className="font-bold py-3">
                {cartTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </div>

            <div
              className="flex flex-row justify-between"
              style={{ borderBottom: "1px solid #dadde1" }}
            >
              <Typography align="left" variant="body2" className="py-3">
                Shipping:
              </Typography>

              <Typography variant="body2" className="font-bold py-3">
                Free Shipping
              </Typography>
            </div>

            <div className="flex flex-row justify-between">
              <Typography align="left" variant="body2" className="py-3">
                Grand Total:{" "}
              </Typography>

              <Typography variant="body2" className="font-bold py-3">
                {cartTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </div>

            <Button size="small" variant="outlined" color="success" fullWidth>
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
