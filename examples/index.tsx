import { createRoot } from "react-dom/client";
import React from "react";
import { CredentialsFormStorage } from "./FormStorage";
import { CredentialsFormValidation } from "./FormValidation";
import { CredentialsFormErrorsVisibility } from "./FormErrorsVisibility";
import { CredentialsFormErrorsMessages } from "./FormErrorsMessages";
import { observer } from "mobx-react";
import { Input, Button, Typography, Box } from '@mui/material';

@observer
class Form extends React.Component<any> {
  private formStorage = new CredentialsFormStorage();
  private formValidation = new CredentialsFormValidation(this.formStorage);
  private formErrorsVisibility = new CredentialsFormErrorsVisibility(
    this.formStorage,
    this.formValidation
  );
  private formErrorsMessages = new CredentialsFormErrorsMessages(
    this.formStorage,
    this.formValidation
  );

  render(): React.ReactElement {
    return (
      <Box
        component="form"
        noValidate
        display="flex"
        sx={{ '&': { flexDirection: 'column', width: 400 } }}
        autoComplete="off"
      >
        <Input
          type="email"
          value={this.formStorage.fields.email.value}
          onChange={(e) =>
            this.formStorage.fields.email.onChange(e.target.value)
          }
          autoComplete="off"
          error={this.formErrorsVisibility.fields.email}
        />
        {this.formErrorsVisibility.fields.email && (
          <Typography>{this.formErrorsMessages.fields.email}</Typography>
        )}
        <Input
          type="password"
          value={this.formStorage.fields.password.value}
          onChange={(e) =>
            this.formStorage.fields.password.onChange(e.target.value)
          }
          error={this.formErrorsVisibility.fields.password}
        />
        {this.formErrorsVisibility.fields.password && (
          <Typography>{this.formErrorsMessages.fields.password}</Typography>
        )}
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            this.formErrorsVisibility.showErrors();
          }}
        >
          Submit
        </Button>
      </Box>
    );
  }
}

createRoot(document.querySelector("#root")!).render(<Form />);

