import s from "./Page404.module.css"
import { ButtonLink } from "common/components/ButtonLink/ButtonLink"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <ButtonLink href="/">Вернуться на главную</ButtonLink>
    </>
  )
}