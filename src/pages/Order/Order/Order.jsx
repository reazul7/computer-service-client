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
    const categories = ["computer-service", "laptop-service", "software-installations", "virus-removal", "data-recovery"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [service] = useService();

    const computerService = service?.filter(item => item?.category === "computer service");
    const laptopService = service?.filter(item => item?.category === "laptop service");
    const softwareInstallations = service?.filter(item => item?.category === "software installations");
    const virusRemoval = service?.filter(item => item?.category === "virus removal");
    const dataRecovery = service?.filter(item => item?.category === "data recovery");

    return (
        <div>
            <Helmet>
                <title>Order | Computer Service</title>
            </Helmet>
            <Cover image={orderImage} title={"Order Service"} />
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Computer Service</Tab>
                    <Tab>Laptop Service</Tab>
                    <Tab>Software Installations</Tab>
                    <Tab>Virus Removal</Tab>
                    <Tab>Data Recovery</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={computerService} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={laptopService} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={softwareInstallations} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={virusRemoval} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dataRecovery} />
                </TabPanel>
            </Tabs>
        </div>
    );
}
