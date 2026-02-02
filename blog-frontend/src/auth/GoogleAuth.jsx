export default function GoogleAuth() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="border w-full p-2 mt-2"
    >
      Continue with Google
    </button>
  );
}