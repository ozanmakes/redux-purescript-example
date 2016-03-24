export default function actionTransformer (action) {
  var type = action.type
  var values = {}

  if (typeof action.type === "object") {
    type = action.type.constructor.name

    for (var prop in action.type) {
      if (/^value\d+$/.test(prop)) {
        let value = action.type[prop]
        values[prop] = value
        type += " "
        type += typeof value === "object" ? "..." : JSON.stringify(value)
      }
    }
  }

  return { ...values, ...action, type }
}
