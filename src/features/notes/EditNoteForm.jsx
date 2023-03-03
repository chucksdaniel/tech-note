import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditNoteForm = ({ note, users }) => {
	const [updateNote, { isLoading, isSuccess, isError, error }] =
		useUpdateNoteMutation();

	const [
		deleteNote,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delError },
	] = useDeleteNoteMutation();

	const navigate = useNavigate();

	const [userId, setUserId] = useState(note.user);
	const [title, setTitle] = useState(note.title);
	const [text, setText] = useState(note.text);
	const [completed, setCompleted] = useState(note.completed);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setTitle("");
			setText("");
			setUserId("");
			setCompleted(false);
			navigate("/dash/notes");
		}
	}, [isSuccess, isDelSuccess, navigate]);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onTextChanged = (e) => setText(e.target.value);
	const onCompletedChanged = (e) => setCompleted((prev) => !prev);
	const onUserIdChanged = (e) => setUserId(e.target.value);

	const canSave = [title, text, userId].every(Boolean) && !isLoading;

	const onSaveNoteClicked = async () => {
		await updateNote({ title, text, completed });
	};

	const onDeleteNoteClicked = async () => {
		await deleteNote({ id: note.id });
	};

	const created = new Date(note.createdAt).toLocaleString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	const updated = new Date(note.updatedAt).toLocaleString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});

	const options = users.map((user) => {
		return (
			<option key={user.id} value={user.id}>
				{user.username}
			</option>
		);
	});

	const errClass = isError || isDelError ? "errmsg" : "offscreen";
	const validTitleClass = !title ? "form__input--incomplete" : "";
	const validTextClass = !text ? "form__input--incomplete" : "";
	const errorContent = (error?.data.message || delError?.data.message) ?? "";

	const content = (
		<>
			<p className={errClass}> {errorContent} </p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__title-row">
					<h2>Edit Note</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button"
							title="Save"
							onClick={onSaveNoteClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className="icon-button"
							title="Delete"
							onClick={onDeleteNoteClicked}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
				<label className="form__label" htmlFor="note-title">
					Title:
				</label>
				<input
					className={`form__input ${validTitleClass}`}
					id="note-title"
					type="text"
					name="title"
					autoComplete="off"
					value={title}
					onChange={onTitleChanged}
				/>
				<label className="form__label" htmlFor="note-text">
					Text:
				</label>
				<textarea
					className={`form__input form__input--text ${validTextClass}`}
					id="note-text"
					name="text"
					value={text}
					onChange={onTextChanged}
				/>
				<div className="form__row">
					<div className="form__divider">
						<label
							className="form__label form__checkbox-container"
							htmlFor="note-status"
						>
							WORK STATUS:
						</label>
						<input
							className="form__checkbox"
							id="note-status"
							type="checkbox"
							name="completed"
							checked={completed}
							onChange={onCompletedChanged}
						/>
						<label
							className="form__label form__checkbox-container"
							htmlFor="assign-to"
						>
							ASSIGNED TO:
						</label>
						<select
							className="form__select"
							id="assign-to"
							type="checkbox"
							name="username"
							value={userId}
							onChange={onUserIdChanged}
						>
							{" "}
							{options}
						</select>
					</div>
					<div className="form__divider">
						<p className="form__created">
							Created: <br /> {created}
						</p>
						<p className="form__updated">
							Updated: <br /> {updated}
						</p>
					</div>
				</div>
			</form>
		</>
	);

	return content;
};

export default EditNoteForm;
