export default async function RsvpConf({ params }) {
    const { inviteId } = await params;
    return (
        <div>
            <h1> Welcome to the RSVP PAGE</h1>
            <div> YOUR RSVP ID IS : {inviteId}</div>
        </div>
    );
}
