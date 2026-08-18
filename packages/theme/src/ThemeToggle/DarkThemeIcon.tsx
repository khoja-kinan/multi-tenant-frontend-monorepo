import { SVGProps } from "react"
const DarkThemeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7.75 2.173a.593.593 0 0 1 .128.647 7.11 7.11 0 0 0 9.301 9.301.593.593 0 0 1 .776.775A8.298 8.298 0 0 1 2 9.704a8.297 8.297 0 0 1 5.104-7.659.593.593 0 0 1 .646.128Z"
      clipRule="evenodd"
      opacity={0.8}
    />
  </svg>
)
export default DarkThemeIcon
