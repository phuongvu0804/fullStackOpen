sequenceDiagram
    participant browser
    participant server

    browser->>server: POST "https://studies.cs.helsinki.fi/exampleapp/new_note_spa"
    activate server
    server-->>browser: JSON data
    deactivate server

    Note over browser,server: The form to add new note has no action or method attributes.<br/> When new note is created, the page is not reloaded, <br/> it uses the Javascript code fetched from server <br/> to push new note into form element. <br/> An event handler is registered to the form's submit event. <br/> When the form is submitted, the default handleing of form's submit is prevented. <br/> The event handler creates a new note, push it to the note list,<br/> and send new note to server.

