import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({ message: null, type: null })

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification({ message: null, type: null })
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(p => p.name === newName)

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personObject = { ...existingPerson, number: newNumber }

                personService
                    .update(existingPerson.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        showNotification(`Updated ${returnedPerson.name}`, 'success')
                    })
                    .catch(error => {
                        showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
                        setPersons(persons.filter(p => p.id !== existingPerson.id))
                    })
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    //showNotification(`Added ${returnedPerson.name}`, 'success')
                })
                .catch(error => {
                    showNotification(error.response.data.error, 'error')
                    console.log(error.response.data.error)
                })
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    showNotification(`Deleted ${person.name}`, 'success')
                })
                .catch(error => {
                    showNotification(`Information of ${person.name} has already been removed from server`, 'error')
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = filter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification.message} type={notification.type} />

            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App
