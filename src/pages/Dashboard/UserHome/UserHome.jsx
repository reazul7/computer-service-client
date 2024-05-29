import useAuth from "../../../hooks/useAuth";

export default function UserHome() {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-3xl">Hi, Welcome</h2>
            <span>{user?.displayName ? user?.displayName : "Black"}</span>
        </div>
    );
}
