import { Form, useLoaderData, redirect } from "react-router-dom";
import { Contact } from "./contact";
import { updateContact } from "../contacts";

export async function action({ request, params }){
    
    const formData = await request.formData();
    console.log('request :>> ', request);
    console.log('params :>> ', params);

    console.log('formData :>> ', formData);
    const updates = Object.fromEntries(formData);

    console.log('updates :>> ', updates);

    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
    const { contact } = useLoaderData() as { contact: Contact };

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First Name"
                    type="text"
                    name="first"
                    defaultValue={contact.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last Name"
                    type="text"
                    name="last"
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    type="text"
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea name="notes" defaultValue={contact.notes} rows={6} />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    );
}
