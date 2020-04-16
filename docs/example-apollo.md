---
id: example-apollo
title: Apollo
sidebar_label: Apollo
---

```javascript
import React, { useState } from 'react';
import { gql, useMutation } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing'
import { Button, TextInput, View } from 'react-native';
import { render, fireEvent, act } from "@testing-library/react-native";
import wait from "waait";

const UPDATE_EMAIL = gql`
    mutation UpdateEmail($email: String!) {
        updateEmail(email: $email) {
            newEmail
        }
    }
`;

function UpdateEmailForm() {
    const [uppdateEmail, data] = useMutation(UPDATE_EMAIL);
    const [email, setEmail] = useState('');

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => setEmail({ text })}
                />
                <Button onPress={() => {
                    return updateEmail({
                        variables: {
                            email
                        }
                    })
                }} title="Submit" />
            </View>
        );
    }
}

function renderComponent(mocks = []) {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <UpdateEmailForm />
        </>
    )
}

describe("UpdateEmailForm", () => {
    it("should update my email", async () => {
        jest.useRealTimers();

        const { getByPlaceholderText, getByText, queryByText } = renderComponent();

        const emailInput = getByPlaceholderText("Email");
        const sendLinkButton = getByText("update my email");

        fireEvent.changeText(emailInput, "test@gmail.com");
        fireEvent.pressOut(sendLinkButton);

        await act(async () => {
            await wait(0);
        });

        expect(queryByText(/Email successfully updated/)).toBeTruthy();
    });
});
```
