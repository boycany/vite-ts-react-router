import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

type FavoriteProps = {
    contact: Contact;
};

export interface Contact {
    id?: string;
    first?: string;
    last?: string;
    avatar?: string;
    twitter?: string;
    notes?: string;
    favorite?: boolean;
    createdAt?: number;
}

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export default function Contact() {
    const { contact } = useLoaderData() as { contact: Contact };
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes.",
    //     favorite: true,
    // };

    function deleteFormHandler(e: React.FormEvent<HTMLFormElement>) {
        if (!confirm("Please confirm you want to delete this record.")) {
            e.preventDefault();
        }
    }

    return (
        <div id="contact">
            <div>
                <img src={contact.avatar || undefined} alt={contact.avatar} />
            </div>
            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            href={`https://twitter.com/${contact.twitter}`}
                            target="_blank"
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(e) => deleteFormHandler(e)}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }: FavoriteProps) {
    let favorite = contact.favorite;

    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}
