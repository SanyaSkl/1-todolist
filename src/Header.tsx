import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {switchThemeAC, ThemeMode} from "./app/app-reducer";
import {RootState} from "./app/store";
import {getTheme} from "./common/theme/theme";
import {MenuButton} from "./MenuButton";

export const Header = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    const dispatch = useDispatch()

    const changeModeHandler = () => {
        dispatch(switchThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                    <Switch color={"default"} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}