export const appConstants = {
    remote: {
        loadContacts: 'api/getContacts',
        saveContact: 'api/saveContact',
        updateContact: 'api/updateContact',
        changeStatus: 'api/updateStatus',
        deleteContact: 'api/deleteConatcts'
    },
    descriptions: {
        deleteMultiple: 'Are you sure to delete the selected contact?',
        delete: 'Are you sure to delete this contact?',
        status: 'Are you sure to change status of the selected contact?',
    },
    messages: {
        addContact: 'Contact successfully added!',
        updateContact: 'Contact successfully updated!',
        deleteContact: 'Contact successfully deleted!',
        deleteMultiple: 'Selected contact successfully deleted!',
        changeStatus: 'Selected contact successfully changed!'
    },
    classes: {
        success: 'btn-primary',
        failed: 'btn-alert',
        warning: 'btn-warning'
    }
}