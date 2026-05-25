import { useFormStatus } from "react-dom";

export default function Submit() {

    const {pending} = useFormStatus();
    console.log('pending', pending);

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
    </p>
  );
}
