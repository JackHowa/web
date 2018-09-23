import Hero from "../components/Hero"
import {colors} from "../constants"

import theme from "../components/theme"
import client from "../createContentfulClient"

export default class Index extends React.Component {
  static async getInitialProps() {
    const data = await client.getEntries()
    return {data}
  }
  render() {
    return (<main>
      <Hero/>
    </main>
    )
}
}
