import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
	useEffect(() => {
		console.log("subscribing");
		const notes = store.dispatch(
			notesApiSlice.endpoints.addNewNote.initiate()
		);
		const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

		return () => {
			console.log("unsubscribing");
			notes.unsubscribe();
			users.unsubscribe();
		};
	}, []);
	return <Outlet />;
};

export default Prefetch;
