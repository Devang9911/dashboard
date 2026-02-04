import logoLight from "../../data/img/logo-light.png"
// import logoDark from "../../data/img/logo-dark.png"

function Logo() {
  return (
    <div className="flex justify-center items-center">
        <img src={logoLight} alt="logo" className="w-40" />
    </div>
  )
}

export default Logo