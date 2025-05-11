import { ReactNode } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

type ButtonLinkProps = {
  href: string
  children: ReactNode
}

export const ButtonLink = ({ href, children }:  ButtonLinkProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="primary"
        href={href}
        target="_blank" // Открывает ссылку в новой вкладке
        rel="noopener noreferrer" // Безопасность при открытии новой вкладки
      >
        {children}
      </Button>
    </Box>
  )
}