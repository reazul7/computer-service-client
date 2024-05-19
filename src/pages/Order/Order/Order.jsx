import Cover from "../../Shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useService from "../../../hooks/useService";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import orderImage from "../../../assets/shop/banner2.jpg";

export default function Order() {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useService();

    const salad = menu?.filter(item => item?.category === "salad");
    const dessert = menu?.filter(item => item?.category === "dessert");
    const pizza = menu?.filter(item => item?.category === "pizza");
    const soup = menu?.filter(item => item?.category === "soup");
    const drinks = menu?.filter(item => item?.category === "drinks");

    return (
        <div>
            <Helmet>
                <title>Order | Computer Service</title>
            </Helmet>
            <Cover image={orderImage} title={"Order Food"} />
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
}
