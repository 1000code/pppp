import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import WarehouseSharpIcon from "@mui/icons-material/WarehouseSharp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import HistorySharpIcon from "@mui/icons-material/HistorySharp";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import SupportAgentSharpIcon from "@mui/icons-material/SupportAgentSharp";
import CalculateSharpIcon from "@mui/icons-material/CalculateSharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import PercentSharpIcon from "@mui/icons-material/PercentSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";

export default function TemporaryDrawer() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // alert(anchor);
    setState({ ...state, [anchor]: open });
  };

  //=============== user profile =================
  const [anchorEll, setAnchorEll] = React.useState(null);
  const profile = Boolean(anchorEll);
  const handleClickProfile = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEll(null);
  };

  // ==================== drawer ======================
  const list = (anchor) => (
    <Box role="presentation">
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            style={{
              fontSize: "1.4rem",
              color: "red",
              lineHeight: "4.5rem",
              textDecoration: "none",
            }}
            component="div"
            id="nested-list-subheader"
            as={Link}
            to="/dashboard"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            Cloud Express
          </ListSubheader>
        }
      >
        {/* ================ menu dropdown ======================= */}
        {user.role_sub_branch === "branch" ||
        user.role_sub_branch === "rider" ||
        user.role_sub_branch === "counter" ? (
          <>
            <ListItemButton onClick={() => setMenuParcel(!menuParcel)}>
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="ພັດສະດຸ" />
              {menuParcel ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuParcel} timeout="auto" unmountOnExit>
              {/* --------------- start sub menu --------------- */}

              {user.role_sub_branch === "branch" ||
              user.role_sub_branch === "counter" ? (
                <>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel/add"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <AddShoppingCartSharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ເພີ່ມພັດສະດຸ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel-for-sent"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <SupportAgentSharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ພັດສະດຸຕ້ອງສົ່ງ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel/cancel"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <HistorySharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ປະຫວັດເພີ່ມພັດສະດຸ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                </>
              ) : null}

              {user.role_sub_branch === "branch" ||
              user.role_sub_branch === "rider" ||
              user.role_sub_branch === "counter" ? (
                <>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel/send-parcel"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <CalculateSharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ຄຳນວນເງິນ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                </>
              ) : null}
            </Collapse>
          </>
        ) : null}

        {/* ---------------------------- */}
        {user.role_sub_branch === "branch" ||
        user.role_sub_branch === "warehouse" ||
        user.role_sub_branch === "counter" ||
        user.role_sub_branch === "truck" ? (
          <>
            <ListItemButton onClick={() => setMenuWarehouse(!menuWarehouse)}>
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="ສູນກະຈ່າຍພັດສະດຸ" />
              {menuWarehouse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuWarehouse} timeout="auto" unmountOnExit>
              {user.role_sub_branch === "branch" ||
              user.role_sub_branch === "counter" ||
              user.role_sub_branch === "warehouse" ? (
                <>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel/receive-parcel"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ຮັບພັດສະດຸ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel-in-warehouse"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ພັດສະດຸ ໃນສາງ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/parcel/receive-parcel-truck"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ຮັບພັດສະດຸ ຂຶ້ນລົດ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                </>
              )}
            </Collapse>
          </>
        ) : null}
        {/* ---------------------------- */}
        {user.role_sub_branch === "branch" ||
        user.role_sub_branch === "warehouse" ||
        user.role_sub_branch === "counter" ? (
          <>
            <ListItemButton onClick={() => setMenuMember(!menuMember)}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="ຜູ້ໃຊ້ງານລະບົບ" />
              {menuMember ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuMember} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {user.role_sub_branch === "branch" ||
                user.role_sub_branch === "warehouse" ? (
                  <>
                    <ListItemButton
                      sx={{ pl: 4, textDecoration: "none" }}
                      onKeyDown={toggleDrawer(anchor, false)}
                      onClick={toggleDrawer(anchor, false)}
                      as={Link}
                      to="/dashboard/user-branch"
                    >
                      <ListItemIcon>
                        <PeopleOutlineSharpIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="ພະນັກງານ"
                        sx={{ textDecoration: "none", color: "#333" }}
                      />
                    </ListItemButton>
                  </>
                ) : null}

                {user.role_sub_branch === "branch" ||
                user.role_sub_branch === "counter" ? (
                  <ListItemButton
                    sx={{ pl: 4, textDecoration: "none" }}
                    onKeyDown={toggleDrawer(anchor, false)}
                    onClick={toggleDrawer(anchor, false)}
                    as={Link}
                    to="/dashboard/customers"
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ຂໍ້ມູນລູກຄ້າ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItemButton>
                ) : null}
              </List>
            </Collapse>
          </>
        ) : null}

        {/* ---------------------------- */}
        {user.role_sub_branch === "branch" ||
        user.role_sub_branch === "warehouse" ||
        user.role_sub_branch === "counter" ||
        user.role_sub_branch === "rider" ? (
          <>
            <ListItemButton onClick={() => setMenuReport(!menuReport)}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="ລາຍງານ" />
              {menuReport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuReport} timeout="auto" unmountOnExit>
              {user.user_type === "branch" ||
              user.role_sub_branch === "counter" ||
              user.role_sub_branch === "rider" ? (
                <>
                  <ListItem
                    sx={{ marginLeft: "1rem" }}
                    as={Link}
                    to="/dashboard/total-shipping-cost"
                    onKeyDown={toggleDrawer(anchor, false)}
                    onClick={toggleDrawer(anchor, false)}
                  >
                    <ListItemIcon>
                      <CurrencyExchangeSharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ຍອດເງິນທີ່ຕ້ອງສົ່ງ"
                      sx={{ textDecoration: "none", color: "#333" }}
                    />
                  </ListItem>
                </>
              ) : null}
              {user.role_sub_branch === "branch" ? (
                <ListItem
                  sx={{ marginLeft: "1rem" }}
                  as={Link}
                  to="/dashboard/get-money-counter"
                  onKeyDown={toggleDrawer(anchor, false)}
                  onClick={toggleDrawer(anchor, false)}
                >
                  <ListItemIcon>
                    <ThumbsUpDownIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="ຮັບເງິນຈາກ Counter"
                    sx={{ textDecoration: "none", color: "#333" }}
                  />
                </ListItem>
              ) : null}

              {user.role_sub_branch === "branch" ||
              user.role_sub_branch === "warehouse" ? (
                <ListItem
                  sx={{ marginLeft: "1rem" }}
                  as={Link}
                  to="/dashboard/dividends"
                  onKeyDown={toggleDrawer(anchor, false)}
                  onClick={toggleDrawer(anchor, false)}
                >
                  <ListItemIcon>
                    <PercentSharpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="ຜົນຕອບແທນ"
                    sx={{ textDecoration: "none", color: "#333" }}
                  />
                </ListItem>
              ) : null}
            </Collapse>
          </>
        ) : null}
      </List>
    </Box>
  );

  // =================== menu dropdown ======================
  const [open, setOpen] = React.useState(true);
  const [menuParcel, setMenuParcel] = React.useState(false);
  const [menuWarehouse, setMenuWarehouse] = React.useState(false);
  const [menuMember, setMenuMember] = React.useState(false);
  const [menuReport, setMenuReport] = React.useState(false);

  //===============================
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });
    navigate("/");
    setAnchorEll(null);
  };
  return (
    <div className="d-print">
      {user && (
        <>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <AppBar position="fixed">
              <Toolbar style={{ backgroundColor: "#fff" }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon style={{ color: "#ff6f5c" }} />
                </IconButton>
                <div className="text-danger h6  p-0 m-0">
                  {user.name} <i className="text-muted">({user.branch_code})</i>
                </div>
                <Typography sx={{ flexGrow: 1 }} />
                {auth && (
                  <div>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClickProfile}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <AccountCircleIcon />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEll}
                      id="account-menu"
                      open={profile}
                      onClose={handleCloseProfile}
                      onClick={handleCloseProfile}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Avatar />
                        {user.username.length > 12 ? (
                          <div className="avatarName">
                            <p className="text-danger mt-3 ">{user.username}</p>
                            <p className="branchCode ">{user.branch_code}</p>
                          </div>
                        ) : (
                          <div className="avatarName">
                            <h4 className="text-danger mt-2 ">
                              {user.username}
                            </h4>

                            <p className="branchCode ">
                              {user.role_sub_branch}
                            </p>
                          </div>
                        )}
                      </MenuItem>
                      {/* <MenuItem>
                        <Avatar /> My account
                      </MenuItem> */}
                      <Divider />
                      {/* <MenuItem>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem> */}
                      <MenuItem onClick={logout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        ອອກຈາກລະບົບ
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>

          {/* ============ Drawer ================= */}
          <React.Fragment key={"left"}>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
        </>
      )}
    </div>
  );
}
