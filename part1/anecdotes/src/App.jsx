import {useState} from 'react'

// Taken from developer.mozilla.org
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // Random between min (inclusive) and max (exclusive) 
}

const Button = ({handleClick, text}) => {
    return (
        <>
            <button onClick={handleClick}>{text}</button>
        </>
    )
}

const Anecdote = ({anecdote, votes}) => {
    return (
        <>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </>
    )
}

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selectedEntry, setSelectedEntry] = useState(0)                                 // Gets and sets the current anecdote
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))       // Array of votes. Each entry correspond to anecdote entry in array
    const [mostVotedEntry, setMostVotedEntry] = useState(0)                     // Gets and sets the current anecdote with the most votes

    const selectAnecdote = () => {
        setSelectedEntry(getRandomInt(0, anecdotes.length))
    }

    const handleVote = () => {
//
        const copiedVotes = [...votes]                                             // Copies the old array

        copiedVotes[selectedEntry] += 1                                                        // Increments value at array entry/index                                 
        setVotes(copiedVotes)                                                             // Sets/updates votes of the newly copied array

        handleMostVotes(copiedVotes)                                                      // THe newly updated array gets passed, so that the function can operate on the correct data
                                                                                          // This is because the state is being updated asynchronously -  i.e. not immediately but "at some point" before the component is rendered again.)
    }

    const handleMostVotes = (updatedVotes) => {
        let tempMostVotedEntry = mostVotedEntry
        for (let i = 0; i < updatedVotes.length; i++) {
            if (updatedVotes[i] > updatedVotes[mostVotedEntry]) {                         // If the 'i' entry now has most vote
                tempMostVotedEntry = i                                                    // the temporary variable will be updated
            }
        }
        setMostVotedEntry(tempMostVotedEntry)                                             // Sets the most voted entry
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selectedEntry]} votes={votes[selectedEntry]}/>
            <Button handleClick={handleVote} text={"vote"}/>
            <Button handleClick={selectAnecdote} text={"next anecdote"}/>
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdote={anecdotes[mostVotedEntry]} votes={votes[mostVotedEntry]}/>
        </div>
    )
}

export default App
