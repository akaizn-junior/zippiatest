import { useEffect, useState } from "react"
import * as ReactDOM from "react-dom"

const safeFun = (fn: Function) => fn && typeof fn === 'function' ? fn : () => {}

const Portal = (props: any) => {
  const { open, parent, children, onClick } = props;
  const [node, setNode] = useState(null)

  useEffect(() => {
    const n = ReactDOM.createPortal(children,
      // @ts-ignore-line
      document.querySelector(parent)
    )

    // @ts-ignore-line
    setNode(n)
  }, [parent, children])

  return (
    <>
      {open &&
        <div
          role="presentation"
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 2,
            overflow: 'hidden'
          }}
          onClick={e => safeFun(onClick)(e)}
          >
          {node}
        </div>
      }
    </>
  );
}

export default Portal
