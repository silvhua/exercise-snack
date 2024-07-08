import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";

export default async function Dashboard({ userObject }) {

  // if (!userObject) {
  //   redirect('/');
  // }
  userObject = {
    username: 'silvhua',
    first_name: 'Silvia',
    userId: '446d0b20-e96b-4164-a591-b3566c6cefc7'
  }
  const { id, username, first_name, last_name, password } = userObject;
  // const userProps = { 
  //   id: id,
  //   first_name: first_name
  // };
  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises userObject={userObject}  />
    </>
  );
}
