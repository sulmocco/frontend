import { useQuery } from "@tanstack/react-query"
import React, { useEffect } from "react"
import TableCard from "../../components/tablecard"
import sulmoggoApi from "../../shared/apis"
import { Container } from "../signup/styles"
import { TablesWrapper } from "./styles"

const Tables = (props) => {
    const getTables = async() => {
        const res = await sulmoggoApi.getTables()
        return res.data
    }
    const {isSuccess, data} = useQuery(['tables'], getTables,{
        onSuccess: (data) => {
            console.log(data.tables);
        }
    })
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <TablesWrapper>
            {isSuccess && data.tables.map(table => 
                <TableCard {...table}/>
            )}
        </TablesWrapper>
    )
}

export default Tables