import { useEffect, useState } from "react"
import * as ReactDOM from "react-dom"

const Portal = (props: any) => {
  const { parent, children } = props;
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
   }, [])

   return mounted
      ? ReactDOM
        .createPortal(
          children,
          // @ts-ignore-line
          document.querySelector(parent || "#app-root-portal")
        )
      : null
}

export default Portal
