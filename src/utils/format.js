function formatMongoDateToHumanReadable(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Define options for the desired format
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    // Format the date using the options
    return date.toLocaleDateString('en-GB', options);
}
export default formatMongoDateToHumanReadable;