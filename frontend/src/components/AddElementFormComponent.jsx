import { DragAndDropImageComponent } from "./DragAndDropImageComponent"
import { Input, Button, Textarea } from "@nextui-org/react";
import { inputWrapperClassNames } from '../constants/inputWrapperClassNames'
import { useState } from "react";

export const AddElementFormComponent = ({ elementName }) => {
  
  return (
    <section className="form-container">
      <div key={elementName} className="form form-element">
        {elementName !== "City" && (
          <DragAndDropImageComponent multiple={elementName === "Listing"}/>
        )}
        <Input 
          type="text" 
          variant="bordered" 
          label={elementName == "Listing" ? "Title" : `${elementName}`}
          className="form-input"
          classNames={inputWrapperClassNames}
        />
        {elementName === "City" && (
          <Input
            type="text"
            label="Country"
            variant="bordered"
            className="form-input"
            classNames={inputWrapperClassNames}
          />
        )}
        {elementName === "Listing" && (
            <Textarea
              label="Description"
              variant="bordered"
              placeholder="Enter your description"
              className="form-input"
              classNames={inputWrapperClassNames}
            />
        )}
        <Button radius="full" className="bg-[#ff6f00] text-white">
            Add { elementName }
        </Button>
      </div>
    </section>
  )
}
