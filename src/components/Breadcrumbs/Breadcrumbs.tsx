import { Breadcrumbs as BreadcrumbsMui, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { colors } from "../../constants/colors"
import { useContext } from "react"
import { Context } from "../../App"


interface IProps {
    className?: string
    links: { title: string, href: string }[] | []
    light?: boolean
}

const Breadcrumbs: React.FC<IProps> = ({ className, links, light = false }) => {
    const {  isTablet } = useContext(Context)

    return (
        <BreadcrumbsMui sx={isTablet ? { paddingBottom: 1.2, paddingTop: 2.4 } : { paddingBottom: 3, paddingTop: 5 }} color={light ? colors.white : colors.black} className={className}>
            {links?.map((link, index) => {
                return (
                    (links.length - 1 !== index)
                        ?
                        <Link to={link.href} key={link.title} style={{ textDecoration: "none" }}>
                            <Typography variant="subtitle1"
                                sx={{
                                    color: light ? colors.white : colors.black,
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            > {link.title}</Typography>
                        </Link>
                        :
                        <Typography variant="subtitle1" key={link.title}>
                            {link.title}
                        </Typography>
                )
            }
            )}

        </BreadcrumbsMui >
    )
}
export default Breadcrumbs