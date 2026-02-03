import { useState } from 'react'
import Unicafe from './Unicafe'
import Anecdotes from './Anecdotes'

const App = () => {
    return (
        <div className="container">
            <h1>Full Stack Open Exercises</h1>

            <section>
                <h1>Unicafe</h1>
                <Unicafe />
            </section>

            <div style={{ margin: '2rem 0', borderTop: '1px solid #444' }}></div>

            <section>
                <h1>Anecdotes</h1>
                <Anecdotes />
            </section>

        </div>
    )
}

export default App
