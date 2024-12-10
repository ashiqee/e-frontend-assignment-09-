import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import RegistrationForm from "./RegistrationForm";



export default function RegistrationTabs() {
    const [selected, setSelected] = React.useState<React.Key | null | undefined>("customer");
   


    return (
        <div className="flex flex-col w-full">
        <Card className="max-w-full w-full h-full">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              aria-label="Tabs form"
              selectedKey={selected as string}
              size="md"
              onSelectionChange={setSelected}
            >
              <Tab key="customer" title="Become A Customer">
              Customer Registration
              <RegistrationForm role={"CUSTOMER"} />
              </Tab>
              <Tab key="vendor" title="Become A Vendor">
               Vendor Registration
               <RegistrationForm  role={"VENDOR"} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    );
}