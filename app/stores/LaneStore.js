import uuid from 'node-uuid'
import alt from '../libs/alt'
import LaneActions from '../actions/LaneActions'

class LaneStore {
  constructor() {
    this.bindActions(LaneActions)
    this.lanes = []
  }

  create(lane){
    const lanes = this.lanes

    lane.id = uuid.v4()
    lane.notes = lane.notes || []

    this.setState({
      lanes: lanes.concat(lane)
    })
  }

  attachToLane({noteId, laneId}) {
    console.log('attach')
    const lanes = this.lanes.map( lane => {
      console.log(lane.id)
      console.log(laneId + 'passed lane')
      if(lane.id === laneId){
        console.log('match lane')

        if (lane.notes.includes(noteId)) {
          console.log('Alread attached to Lane')
        }else {
          lane.notes.push(noteId)
          console.log('fuck inserted')
        }
      }
      return lane
    })
    this.setState({lanes})
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map( lane => {
      if( lane.id === laneId) {
        lane.notes = lane.notes.filter( note => note.id !== noteId )
      }

      return lane
    })

    this.setState({lanes})
  }

  update(updatedLane) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === updatedLane.id){
	return Object.assign({}, lane, updatedLane)
      }
      return lane
    })
    this.setState({lanes})
  }

  delete(id){
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id)
    })
  }
}

export default alt.createStore(LaneStore, 'LaneStore')
