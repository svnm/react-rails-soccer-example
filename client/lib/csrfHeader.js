export default function() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }
}
