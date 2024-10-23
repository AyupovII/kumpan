import { Accordion as AccordionMui, AccordionDetails, AccordionSummary, Typography, Box, Checkbox } from "@mui/material"
import { ReactComponent as Minus } from '../../assets/svg/minus.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { colors } from "../../constants/colors";
import { IDocument } from "../../types";

interface IProps {
    className?: string
    title: string
    details?: IDocument[]
    onRead?: (index: string, read: boolean) => void
    modifiedDocumentId?: string | null
}

const Accordion: React.FC<IProps> = ({ className, title, details, onRead, modifiedDocumentId }) => {
    const chapter = Boolean(details?.find(item => item.id === modifiedDocumentId));
    const [expanded, setExpanded] = useState(chapter);
    return (
        <AccordionMui disableGutters
            expanded={expanded}
            onChange={(event, isExpanded) => setExpanded(isExpanded)}
            sx={{
                breakInside: "avoid",
                breakBefore: "column",
                breakAfter: "left", 
            }}
        >
            <AccordionSummary sx={{ fontSize: "4rem", borderRadius: 5 }}
                expandIcon={expanded ? <Minus /> : <Plus />}
                aria-controls="panel1-content"
                aria-expanded={true}
                id="panel1-header"

            >
                <Typography variant="subtitle1" fontSize={"2rem"} fontWeight={"bold"}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {details?.map((detail, index) => (
                    <Box display={"flex"} key={detail.id} justifyContent={"space-between"} alignItems={"center"}
                        sx={{
                            borderRadius: 2,
                            border: "1px solid white",
                            animation: modifiedDocumentId=== detail.id ? "modifablePulsate 1.5s ease-out" : "",
                            animationIterationCount: "3",
                        }}
                    >
                        {/* <Typography variant="subtitle1" key={index}>{detail.name}</Typography> */}
                        <Link
                            to={`${BASE_URL.BASE}${detail.url}`}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <Typography
                                sx={{
                                    color: colors.black,
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                                variant="subtitle1">{detail.name}</Typography>
                        </Link>
                        <Checkbox
                            checked={detail.read}
                            size="large"
                            color="success"
                            onClick={() => onRead?.(detail.id, detail.read)}
                        />
                    </Box>
                ))}
            </AccordionDetails>
        </AccordionMui>
    )
}

export default Accordion