import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";

export default async function Dashboard({ userObject }) {

  // if (!userObject) {
  //   redirect('/');
  // }
  userObject = {
    username: 'silvhua',
    first_name: 'Silvia'
  }
  const { id, username, first_name, last_name, password } = userObject;
  // const userProps = { 
  //   id: id,
  //   first_name: first_name
  // };

  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises username={username}  />
    </>
  );
}
