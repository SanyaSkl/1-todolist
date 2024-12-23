import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {switchThemeAC} from "../../../app/app-reducer";
import {selectTheme} from "../../../app/appSelectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getTheme} from "../../theme/theme";
import {MenuButton} from "../MenuButton/MenuButton";

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

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