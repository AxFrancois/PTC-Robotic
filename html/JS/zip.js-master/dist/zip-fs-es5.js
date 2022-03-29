(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zip = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$19 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$D = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$C = fails$D;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$C(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$B = fails$D;

	var functionBindNative = !fails$B(function () {
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$m = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$m.bind(call$m) : function () {
	  return call$m.apply(call$m, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$5 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$5(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var createPropertyDescriptor$7 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var bind$b = FunctionPrototype$3.bind;
	var call$l = FunctionPrototype$3.call;
	var uncurryThis$G = NATIVE_BIND$2 && bind$b.bind(call$l, call$l);

	var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
	  return fn && uncurryThis$G(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$l.apply(fn, arguments);
	  };
	};

	var uncurryThis$F = functionUncurryThis;

	var toString$c = uncurryThis$F({}.toString);
	var stringSlice$9 = uncurryThis$F(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$9(toString$c(it), 8, -1);
	};

	var global$18 = global$19;
	var uncurryThis$E = functionUncurryThis;
	var fails$A = fails$D;
	var classof$e = classofRaw$1;

	var Object$5 = global$18.Object;
	var split$3 = uncurryThis$E(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$A(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$5('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$e(it) == 'String' ? split$3(it, '') : Object$5(it);
	} : Object$5;

	var global$17 = global$19;

	var TypeError$o = global$17.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$8 = function (it) {
	  if (it == undefined) throw TypeError$o("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$7 = requireObjectCoercible$8;

	var toIndexedObject$b = function (it) {
	  return IndexedObject$3(requireObjectCoercible$7(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$p = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$o = isCallable$p;

	var isObject$k = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$o(it);
	};

	var global$16 = global$19;
	var isCallable$n = isCallable$p;

	var aFunction = function (argument) {
	  return isCallable$n(argument) ? argument : undefined;
	};

	var getBuiltIn$9 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$16[namespace]) : global$16[namespace] && global$16[namespace][method];
	};

	var uncurryThis$D = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$D({}.isPrototypeOf);

	var getBuiltIn$8 = getBuiltIn$9;

	var engineUserAgent = getBuiltIn$8('navigator', 'userAgent') || '';

	var global$15 = global$19;
	var userAgent$5 = engineUserAgent;

	var process$3 = global$15.process;
	var Deno = global$15.Deno;
	var versions = process$3 && process$3.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$5) {
	  match = userAgent$5.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$5.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$3 = engineV8Version;
	var fails$z = fails$D;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$z(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$3 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$3
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$14 = global$19;
	var getBuiltIn$7 = getBuiltIn$9;
	var isCallable$m = isCallable$p;
	var isPrototypeOf$7 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$4 = global$14.Object;

	var isSymbol$5 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$7('Symbol');
	  return isCallable$m($Symbol) && isPrototypeOf$7($Symbol.prototype, Object$4(it));
	};

	var global$13 = global$19;

	var String$5 = global$13.String;

	var tryToString$5 = function (argument) {
	  try {
	    return String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$12 = global$19;
	var isCallable$l = isCallable$p;
	var tryToString$4 = tryToString$5;

	var TypeError$n = global$12.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$7 = function (argument) {
	  if (isCallable$l(argument)) return argument;
	  throw TypeError$n(tryToString$4(argument) + ' is not a function');
	};

	var aCallable$6 = aCallable$7;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$5 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$6(func);
	};

	var global$11 = global$19;
	var call$k = functionCall;
	var isCallable$k = isCallable$p;
	var isObject$j = isObject$k;

	var TypeError$m = global$11.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$k(fn = input.toString) && !isObject$j(val = call$k(fn, input))) return val;
	  if (isCallable$k(fn = input.valueOf) && !isObject$j(val = call$k(fn, input))) return val;
	  if (pref !== 'string' && isCallable$k(fn = input.toString) && !isObject$j(val = call$k(fn, input))) return val;
	  throw TypeError$m("Can't convert object to primitive value");
	};

	var shared$5 = {exports: {}};

	var isPure = false;

	var global$10 = global$19;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$b = Object.defineProperty;

	var setGlobal$3 = function (key, value) {
	  try {
	    defineProperty$b(global$10, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$10[key] = value;
	  } return value;
	};

	var global$$ = global$19;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$$[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$5.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.21.1',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$_ = global$19;
	var requireObjectCoercible$6 = requireObjectCoercible$8;

	var Object$3 = global$_.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$d = function (argument) {
	  return Object$3(requireObjectCoercible$6(argument));
	};

	var uncurryThis$C = functionUncurryThis;
	var toObject$c = toObject$d;

	var hasOwnProperty = uncurryThis$C({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$c(it), key);
	};

	var uncurryThis$B = functionUncurryThis;

	var id$1 = 0;
	var postfix = Math.random();
	var toString$b = uncurryThis$B(1.0.toString);

	var uid$5 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id$1 + postfix, 36);
	};

	var global$Z = global$19;
	var shared$4 = shared$5.exports;
	var hasOwn$i = hasOwnProperty_1;
	var uid$4 = uid$5;
	var NATIVE_SYMBOL$2 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$4('wks');
	var Symbol$1 = global$Z.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$4;

	var wellKnownSymbol$s = function (name) {
	  if (!hasOwn$i(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$2 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$2 && hasOwn$i(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var global$Y = global$19;
	var call$j = functionCall;
	var isObject$i = isObject$k;
	var isSymbol$4 = isSymbol$5;
	var getMethod$4 = getMethod$5;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$r = wellKnownSymbol$s;

	var TypeError$l = global$Y.TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$r('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$i(input) || isSymbol$4(input)) return input;
	  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$j(exoticToPrim, input, pref);
	    if (!isObject$i(result) || isSymbol$4(result)) return result;
	    throw TypeError$l("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$1 = toPrimitive$2;
	var isSymbol$3 = isSymbol$5;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$5 = function (argument) {
	  var key = toPrimitive$1(argument, 'string');
	  return isSymbol$3(key) ? key : key + '';
	};

	var global$X = global$19;
	var isObject$h = isObject$k;

	var document$3 = global$X.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$h(document$3) && isObject$h(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$j = descriptors;
	var fails$y = fails$D;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$j && !fails$y(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$i = descriptors;
	var call$i = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$6 = createPropertyDescriptor$7;
	var toIndexedObject$a = toIndexedObject$b;
	var toPropertyKey$4 = toPropertyKey$5;
	var hasOwn$h = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$i ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$a(O);
	  P = toPropertyKey$4(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$h(O, P)) return createPropertyDescriptor$6(!call$i(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$h = descriptors;
	var fails$x = fails$D;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$h && fails$x(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$W = global$19;
	var isObject$g = isObject$k;

	var String$4 = global$W.String;
	var TypeError$k = global$W.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$i = function (argument) {
	  if (isObject$g(argument)) return argument;
	  throw TypeError$k(String$4(argument) + ' is not an object');
	};

	var global$V = global$19;
	var DESCRIPTORS$g = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$h = anObject$i;
	var toPropertyKey$3 = toPropertyKey$5;

	var TypeError$j = global$V.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$g ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$h(O);
	  P = toPropertyKey$3(P);
	  anObject$h(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$h(O);
	  P = toPropertyKey$3(P);
	  anObject$h(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$j('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$f = descriptors;
	var definePropertyModule$7 = objectDefineProperty;
	var createPropertyDescriptor$5 = createPropertyDescriptor$7;

	var createNonEnumerableProperty$a = DESCRIPTORS$f ? function (object, key, value) {
	  return definePropertyModule$7.f(object, key, createPropertyDescriptor$5(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$d = {exports: {}};

	var uncurryThis$A = functionUncurryThis;
	var isCallable$j = isCallable$p;
	var store$1 = sharedStore;

	var functionToString$1 = uncurryThis$A(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$j(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$4 = store$1.inspectSource;

	var global$U = global$19;
	var isCallable$i = isCallable$p;
	var inspectSource$3 = inspectSource$4;

	var WeakMap$1 = global$U.WeakMap;

	var nativeWeakMap = isCallable$i(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

	var shared$3 = shared$5.exports;
	var uid$3 = uid$5;

	var keys$2 = shared$3('keys');

	var sharedKey$4 = function (key) {
	  return keys$2[key] || (keys$2[key] = uid$3(key));
	};

	var hiddenKeys$6 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$T = global$19;
	var uncurryThis$z = functionUncurryThis;
	var isObject$f = isObject$k;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;
	var hasOwn$g = hasOwnProperty_1;
	var shared$2 = sharedStore;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$5 = hiddenKeys$6;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$i = global$T.TypeError;
	var WeakMap = global$T.WeakMap;
	var set$2, get$1, has;

	var enforce = function (it) {
	  return has(it) ? get$1(it) : set$2(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$f(it) || (state = get$1(it)).type !== TYPE) {
	      throw TypeError$i('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$2.state) {
	  var store = shared$2.state || (shared$2.state = new WeakMap());
	  var wmget = uncurryThis$z(store.get);
	  var wmhas = uncurryThis$z(store.has);
	  var wmset = uncurryThis$z(store.set);
	  set$2 = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$i(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$5[STATE] = true;
	  set$2 = function (it, metadata) {
	    if (hasOwn$g(it, STATE)) throw new TypeError$i(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$9(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$g(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$g(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get$1,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var DESCRIPTORS$e = descriptors;
	var hasOwn$f = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$e && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$f(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$e || (DESCRIPTORS$e && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var global$S = global$19;
	var isCallable$h = isCallable$p;
	var hasOwn$e = hasOwnProperty_1;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$2 = inspectSource$4;
	var InternalStateModule$9 = internalState;
	var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;

	var getInternalState$7 = InternalStateModule$9.get;
	var enforceInternalState = InternalStateModule$9.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$d.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable$h(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwn$e(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
	      createNonEnumerableProperty$8(value, 'name', name);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global$S) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$8(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable$h(this) && getInternalState$7(this).source || inspectSource$2(this);
	});

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$7 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$9 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$7 : ceil)(number);
	};

	var toIntegerOrInfinity$8 = toIntegerOrInfinity$9;

	var max$4 = Math.max;
	var min$8 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$8 = function (index, length) {
	  var integer = toIntegerOrInfinity$8(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$8(integer, length);
	};

	var toIntegerOrInfinity$7 = toIntegerOrInfinity$9;

	var min$7 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$a = function (argument) {
	  return argument > 0 ? min$7(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$9 = toLength$a;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$f = function (obj) {
	  return toLength$9(obj.length);
	};

	var toIndexedObject$9 = toIndexedObject$b;
	var toAbsoluteIndex$7 = toAbsoluteIndex$8;
	var lengthOfArrayLike$e = lengthOfArrayLike$f;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$9($this);
	    var length = lengthOfArrayLike$e(O);
	    var index = toAbsoluteIndex$7(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$5(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$5(false)
	};

	var uncurryThis$y = functionUncurryThis;
	var hasOwn$d = hasOwnProperty_1;
	var toIndexedObject$8 = toIndexedObject$b;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$6;

	var push$8 = uncurryThis$y([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$8(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$d(hiddenKeys$4, key) && hasOwn$d(O, key) && push$8(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$d(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$8(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$3);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$6 = getBuiltIn$9;
	var uncurryThis$x = functionUncurryThis;
	var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var anObject$g = anObject$i;

	var concat$3 = uncurryThis$x([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$6('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$2.f(anObject$g(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
	  return getOwnPropertySymbols ? concat$3(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$c = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$6 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$6.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$c(target, key) && !(exceptions && hasOwn$c(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$w = fails$D;
	var isCallable$g = isCallable$p;

	var replacement = /#|\.prototype\./;

	var isForced$4 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$g(detection) ? fails$w(detection)
	    : !!detection;
	};

	var normalize = isForced$4.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$4.data = {};
	var NATIVE = isForced$4.NATIVE = 'N';
	var POLYFILL = isForced$4.POLYFILL = 'P';

	var isForced_1 = isForced$4;

	var global$R = global$19;
	var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
	var redefine$c = redefine$d.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$3 = isForced_1;

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$R;
	  } else if (STATIC) {
	    target = global$R[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$R[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$4(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$7(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$c(target, key, sourceProperty, options);
	  }
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$d = descriptors;
	var uncurryThis$w = functionUncurryThis;
	var call$h = functionCall;
	var fails$v = fails$D;
	var objectKeys$3 = objectKeys$4;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var toObject$b = toObject$d;
	var IndexedObject$2 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$a = Object.defineProperty;
	var concat$2 = uncurryThis$w([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$v(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$d && $assign({ b: 1 }, $assign(defineProperty$a({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$a(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys$3($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$b(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$2(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$2(objectKeys$3(S), getOwnPropertySymbols(S)) : objectKeys$3(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$d || call$h(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$p = _export;
	var assign$1 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$p({ target: 'Object', stat: true, forced: Object.assign !== assign$1 }, {
	  assign: assign$1
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	/* global navigator */
	var DEFAULT_CONFIGURATION = {
	  chunkSize: 512 * 1024,
	  maxWorkers: typeof navigator != "undefined" && navigator.hardwareConcurrency || 2,
	  terminateWorkerTimeout: 5000,
	  useWebWorkers: true,
	  workerScripts: undefined
	};
	var config = Object.assign({}, DEFAULT_CONFIGURATION);

	function getConfiguration() {
	  return config;
	}

	function configure(configuration) {
	  if (configuration.baseURL !== undefined) {
	    config.baseURL = configuration.baseURL;
	  }

	  if (configuration.chunkSize !== undefined) {
	    config.chunkSize = configuration.chunkSize;
	  }

	  if (configuration.maxWorkers !== undefined) {
	    config.maxWorkers = configuration.maxWorkers;
	  }

	  if (configuration.terminateWorkerTimeout !== undefined) {
	    config.terminateWorkerTimeout = configuration.terminateWorkerTimeout;
	  }

	  if (configuration.useWebWorkers !== undefined) {
	    config.useWebWorkers = configuration.useWebWorkers;
	  }

	  if (configuration.Deflate !== undefined) {
	    config.Deflate = configuration.Deflate;
	  }

	  if (configuration.Inflate !== undefined) {
	    config.Inflate = configuration.Inflate;
	  }

	  if (configuration.workerScripts !== undefined) {
	    if (configuration.workerScripts.deflate) {
	      if (!Array.isArray(configuration.workerScripts.deflate)) {
	        throw new Error("workerScripts.deflate must be an array");
	      }

	      if (!config.workerScripts) {
	        config.workerScripts = {};
	      }

	      config.workerScripts.deflate = configuration.workerScripts.deflate;
	    }

	    if (configuration.workerScripts.inflate) {
	      if (!Array.isArray(configuration.workerScripts.inflate)) {
	        throw new Error("workerScripts.inflate must be an array");
	      }

	      if (!config.workerScripts) {
	        config.workerScripts = {};
	      }

	      config.workerScripts.inflate = configuration.workerScripts.inflate;
	    }
	  }
	}

	var objectDefineProperties = {};

	var DESCRIPTORS$c = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$5 = objectDefineProperty;
	var anObject$f = anObject$i;
	var toIndexedObject$7 = toIndexedObject$b;
	var objectKeys$2 = objectKeys$4;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$c && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$f(O);
	  var props = toIndexedObject$7(Properties);
	  var keys = objectKeys$2(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$5.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$5 = getBuiltIn$9;

	var html$2 = getBuiltIn$5('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$e = anObject$i;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$6;
	var html$1 = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$2 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$2[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$2] = anObject$e(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var wellKnownSymbol$q = wellKnownSymbol$s;
	var create$5 = objectCreate;
	var definePropertyModule$4 = objectDefineProperty;

	var UNSCOPABLES = wellKnownSymbol$q('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  definePropertyModule$4.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$5(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$2 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var fails$u = fails$D;

	var correctPrototypeGetter = !fails$u(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$Q = global$19;
	var hasOwn$b = hasOwnProperty_1;
	var isCallable$f = isCallable$p;
	var toObject$a = toObject$d;
	var sharedKey$1 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey$1('IE_PROTO');
	var Object$2 = global$Q.Object;
	var ObjectPrototype$3 = Object$2.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$2.getPrototypeOf : function (O) {
	  var object = toObject$a(O);
	  if (hasOwn$b(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$f(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$2 ? ObjectPrototype$3 : null;
	};

	var fails$t = fails$D;
	var isCallable$e = isCallable$p;
	var getPrototypeOf$3 = objectGetPrototypeOf;
	var redefine$b = redefine$d.exports;
	var wellKnownSymbol$p = wellKnownSymbol$s;

	var ITERATOR$8 = wellKnownSymbol$p('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$t(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$8].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$e(IteratorPrototype$2[ITERATOR$8])) {
	  redefine$b(IteratorPrototype$2, ITERATOR$8, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$9 = objectDefineProperty.f;
	var hasOwn$a = hasOwnProperty_1;
	var wellKnownSymbol$o = wellKnownSymbol$s;

	var TO_STRING_TAG$4 = wellKnownSymbol$o('toStringTag');

	var setToStringTag$8 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$a(target, TO_STRING_TAG$4)) {
	    defineProperty$9(target, TO_STRING_TAG$4, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$4 = objectCreate;
	var createPropertyDescriptor$4 = createPropertyDescriptor$7;
	var setToStringTag$7 = setToStringTag$8;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$4(IteratorPrototype$1, { next: createPropertyDescriptor$4(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$7(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var global$P = global$19;
	var isCallable$d = isCallable$p;

	var String$3 = global$P.String;
	var TypeError$h = global$P.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$d(argument)) return argument;
	  throw TypeError$h("Can't set " + String$3(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$v = functionUncurryThis;
	var anObject$d = anObject$i;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$v(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$d(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$o = _export;
	var call$g = functionCall;
	var FunctionName$1 = functionName;
	var isCallable$c = isCallable$p;
	var createIteratorConstructor$1 = createIteratorConstructor$2;
	var getPrototypeOf$2 = objectGetPrototypeOf;
	var setPrototypeOf$5 = objectSetPrototypeOf;
	var setToStringTag$6 = setToStringTag$8;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
	var redefine$a = redefine$d.exports;
	var wellKnownSymbol$n = wellKnownSymbol$s;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
	var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$7 = wellKnownSymbol$n('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$7]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$5) {
	          setPrototypeOf$5(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$c(CurrentIteratorPrototype[ITERATOR$7])) {
	          redefine$a(CurrentIteratorPrototype, ITERATOR$7, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$6(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME$1) {
	      createNonEnumerableProperty$6(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$g(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$a(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$o({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$7] !== defaultIterator) {
	    redefine$a(IterablePrototype, ITERATOR$7, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$3[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject$6 = toIndexedObject$b;
	var addToUnscopables$1 = addToUnscopables$2;
	var Iterators$2 = iterators;
	var InternalStateModule$8 = internalState;
	var defineProperty$8 = objectDefineProperty.f;
	var defineIterator$2 = defineIterator$3;
	var DESCRIPTORS$b = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$8 = InternalStateModule$8.set;
	var getInternalState$6 = InternalStateModule$8.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
	  setInternalState$8(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$6(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$6(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1('keys');
	addToUnscopables$1('values');
	addToUnscopables$1('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$b && values.name !== 'values') try {
	  defineProperty$8(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	var wellKnownSymbol$m = wellKnownSymbol$s;

	var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$O = global$19;
	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$b = isCallable$p;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$l = wellKnownSymbol$s;

	var TO_STRING_TAG$2 = wellKnownSymbol$l('toStringTag');
	var Object$1 = global$O.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$d = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$b(O.callee) ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$c = classof$d;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$c(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var redefine$9 = redefine$d.exports;
	var toString$a = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  redefine$9(Object.prototype, 'toString', toString$a, { unsafe: true });
	}

	var global$N = global$19;
	var classof$b = classof$d;

	var String$2 = global$N.String;

	var toString$9 = function (argument) {
	  if (classof$b(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$2(argument);
	};

	var uncurryThis$u = functionUncurryThis;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
	var toString$8 = toString$9;
	var requireObjectCoercible$5 = requireObjectCoercible$8;

	var charAt$6 = uncurryThis$u(''.charAt);
	var charCodeAt$2 = uncurryThis$u(''.charCodeAt);
	var stringSlice$8 = uncurryThis$u(''.slice);

	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$8(requireObjectCoercible$5($this));
	    var position = toIntegerOrInfinity$6(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$2(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$2(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$6(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$8(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	var charAt$5 = stringMultibyte.charAt;
	var toString$7 = toString$9;
	var InternalStateModule$7 = internalState;
	var defineIterator$1 = defineIterator$3;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$7 = InternalStateModule$7.set;
	var getInternalState$5 = InternalStateModule$7.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$1(String, 'String', function (iterated) {
	  setInternalState$7(this, {
	    type: STRING_ITERATOR,
	    string: toString$7(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$5(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$5(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var global$M = global$19;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
	var wellKnownSymbol$k = wellKnownSymbol$s;

	var ITERATOR$6 = wellKnownSymbol$k('iterator');
	var TO_STRING_TAG$1 = wellKnownSymbol$k('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$6] !== ArrayValues) try {
	      createNonEnumerableProperty$5(CollectionPrototype, ITERATOR$6, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$6] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$1]) {
	      createNonEnumerableProperty$5(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
	    }
	    if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$5(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  handlePrototype$1(global$M[COLLECTION_NAME$1] && global$M[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
	}

	handlePrototype$1(DOMTokenListPrototype$1, 'DOMTokenList');

	var fails$s = fails$D;
	var wellKnownSymbol$j = wellKnownSymbol$s;
	var IS_PURE = isPure;

	var ITERATOR$5 = wellKnownSymbol$j('iterator');

	var nativeUrl = !fails$s(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var searchParams = url.searchParams;
	  var result = '';
	  url.pathname = 'c%20d';
	  searchParams.forEach(function (value, key) {
	    searchParams['delete']('b');
	    result += key + value;
	  });
	  return (IS_PURE && !url.toJSON)
	    || !searchParams.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || searchParams.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !searchParams[ITERATOR$5]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('http://a#б').hash !== '#%D0%B1'
	    // fails in Chrome 66-
	    || result !== 'a1c3'
	    // throws in Safari
	    || new URL('http://x', undefined).host !== 'x';
	});

	var uncurryThis$t = functionUncurryThis;
	var aCallable$5 = aCallable$7;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$a = uncurryThis$t(uncurryThis$t.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$5(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$a(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var global$L = global$19;
	var isPrototypeOf$6 = objectIsPrototypeOf;

	var TypeError$g = global$L.TypeError;

	var anInstance$7 = function (it, Prototype) {
	  if (isPrototypeOf$6(Prototype, it)) return it;
	  throw TypeError$g('Incorrect invocation');
	};

	var call$f = functionCall;
	var anObject$c = anObject$i;
	var getMethod$3 = getMethod$5;

	var iteratorClose$2 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$c(iterator);
	  try {
	    innerResult = getMethod$3(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$f(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$c(innerResult);
	  return value;
	};

	var anObject$b = anObject$i;
	var iteratorClose$1 = iteratorClose$2;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$b(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$1(iterator, 'throw', error);
	  }
	};

	var wellKnownSymbol$i = wellKnownSymbol$s;
	var Iterators$1 = iterators;

	var ITERATOR$4 = wellKnownSymbol$i('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$3 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$4] === it);
	};

	var uncurryThis$s = functionUncurryThis;
	var fails$r = fails$D;
	var isCallable$a = isCallable$p;
	var classof$a = classof$d;
	var getBuiltIn$4 = getBuiltIn$9;
	var inspectSource$1 = inspectSource$4;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$4('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$4 = uncurryThis$s(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$a(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$a(argument)) return false;
	  switch (classof$a(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$4(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct || fails$r(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var toPropertyKey$2 = toPropertyKey$5;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$7;

	var createProperty$6 = function (object, key, value) {
	  var propertyKey = toPropertyKey$2(key);
	  if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor$3(0, value));
	  else object[propertyKey] = value;
	};

	var classof$9 = classof$d;
	var getMethod$2 = getMethod$5;
	var Iterators = iterators;
	var wellKnownSymbol$h = wellKnownSymbol$s;

	var ITERATOR$3 = wellKnownSymbol$h('iterator');

	var getIteratorMethod$5 = function (it) {
	  if (it != undefined) return getMethod$2(it, ITERATOR$3)
	    || getMethod$2(it, '@@iterator')
	    || Iterators[classof$9(it)];
	};

	var global$K = global$19;
	var call$e = functionCall;
	var aCallable$4 = aCallable$7;
	var anObject$a = anObject$i;
	var tryToString$3 = tryToString$5;
	var getIteratorMethod$4 = getIteratorMethod$5;

	var TypeError$f = global$K.TypeError;

	var getIterator$4 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
	  if (aCallable$4(iteratorMethod)) return anObject$a(call$e(iteratorMethod, argument));
	  throw TypeError$f(tryToString$3(argument) + ' is not iterable');
	};

	var global$J = global$19;
	var bind$9 = functionBindContext;
	var call$d = functionCall;
	var toObject$9 = toObject$d;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
	var isConstructor$3 = isConstructor$4;
	var lengthOfArrayLike$d = lengthOfArrayLike$f;
	var createProperty$5 = createProperty$6;
	var getIterator$3 = getIterator$4;
	var getIteratorMethod$3 = getIteratorMethod$5;

	var Array$7 = global$J.Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$9(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor$3(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$9(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$3(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this == Array$7 && isArrayIteratorMethod$2(iteratorMethod))) {
	    iterator = getIterator$3(O, iteratorMethod);
	    next = iterator.next;
	    result = IS_CONSTRUCTOR ? new this() : [];
	    for (;!(step = call$d(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$5(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike$d(O);
	    result = IS_CONSTRUCTOR ? new this(length) : Array$7(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$5(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var global$I = global$19;
	var toAbsoluteIndex$6 = toAbsoluteIndex$8;
	var lengthOfArrayLike$c = lengthOfArrayLike$f;
	var createProperty$4 = createProperty$6;

	var Array$6 = global$I.Array;
	var max$3 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$c(O);
	  var k = toAbsoluteIndex$6(start, length);
	  var fin = toAbsoluteIndex$6(end === undefined ? length : end, length);
	  var result = Array$6(max$3(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$4(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var global$H = global$19;
	var uncurryThis$r = functionUncurryThis;

	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;

	var RangeError$6 = global$H.RangeError;
	var exec$3 = uncurryThis$r(regexSeparators.exec);
	var floor$6 = Math.floor;
	var fromCharCode = String.fromCharCode;
	var charCodeAt$1 = uncurryThis$r(''.charCodeAt);
	var join$3 = uncurryThis$r([].join);
	var push$7 = uncurryThis$r([].push);
	var replace$6 = uncurryThis$r(''.replace);
	var split$2 = uncurryThis$r(''.split);
	var toLowerCase$1 = uncurryThis$r(''.toLowerCase);

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = charCodeAt$1(string, counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = charCodeAt$1(string, counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
	        push$7(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push$7(output, value);
	        counter--;
	      }
	    } else {
	      push$7(output, value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$6(delta / damp) : delta >> 1;
	  delta += floor$6(delta / numPoints);
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor$6(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor$6(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      push$7(output, fromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push$7(output, delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$6((maxInt - delta) / handledCPCountPlusOne)) {
	      throw RangeError$6(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw RangeError$6(OVERFLOW_ERROR);
	      }
	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        var k = base;
	        while (true) {
	          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          push$7(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$6(qMinusT / baseMinusT);
	          k += base;
	        }

	        push$7(output, fromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join$3(output, '');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split$2(replace$6(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push$7(encoded, exec$3(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join$3(encoded, '.');
	};

	var global$G = global$19;

	var TypeError$e = global$G.TypeError;

	var validateArgumentsLength$3 = function (passed, required) {
	  if (passed < required) throw TypeError$e('Not enough arguments');
	  return passed;
	};

	var redefine$8 = redefine$d.exports;

	var redefineAll$4 = function (target, src, options) {
	  for (var key in src) redefine$8(target, key, src[key], options);
	  return target;
	};

	var arraySlice$a = arraySliceSimple;

	var floor$5 = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor$5(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySlice$a(array, 0, middle), comparefn),
	    mergeSort(arraySlice$a(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort$1 = mergeSort;

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$n = _export;
	var global$F = global$19;
	var getBuiltIn$3 = getBuiltIn$9;
	var call$c = functionCall;
	var uncurryThis$q = functionUncurryThis;
	var USE_NATIVE_URL$1 = nativeUrl;
	var redefine$7 = redefine$d.exports;
	var redefineAll$3 = redefineAll$4;
	var setToStringTag$5 = setToStringTag$8;
	var createIteratorConstructor = createIteratorConstructor$2;
	var InternalStateModule$6 = internalState;
	var anInstance$6 = anInstance$7;
	var isCallable$9 = isCallable$p;
	var hasOwn$9 = hasOwnProperty_1;
	var bind$8 = functionBindContext;
	var classof$8 = classof$d;
	var anObject$9 = anObject$i;
	var isObject$e = isObject$k;
	var $toString$2 = toString$9;
	var create$3 = objectCreate;
	var createPropertyDescriptor$2 = createPropertyDescriptor$7;
	var getIterator$2 = getIterator$4;
	var getIteratorMethod$2 = getIteratorMethod$5;
	var validateArgumentsLength$2 = validateArgumentsLength$3;
	var wellKnownSymbol$g = wellKnownSymbol$s;
	var arraySort = arraySort$1;

	var ITERATOR$2 = wellKnownSymbol$g('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$6 = InternalStateModule$6.set;
	var getInternalParamsState = InternalStateModule$6.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule$6.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var n$Fetch = getBuiltIn$3('fetch');
	var N$Request = getBuiltIn$3('Request');
	var Headers = getBuiltIn$3('Headers');
	var RequestPrototype = N$Request && N$Request.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var RegExp$1 = global$F.RegExp;
	var TypeError$d = global$F.TypeError;
	var decodeURIComponent = global$F.decodeURIComponent;
	var encodeURIComponent$1 = global$F.encodeURIComponent;
	var charAt$4 = uncurryThis$q(''.charAt);
	var join$2 = uncurryThis$q([].join);
	var push$6 = uncurryThis$q([].push);
	var replace$5 = uncurryThis$q(''.replace);
	var shift$1 = uncurryThis$q([].shift);
	var splice = uncurryThis$q([].splice);
	var split$1 = uncurryThis$q(''.split);
	var stringSlice$7 = uncurryThis$q(''.slice);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = replace$5(it, plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = replace$5(result, percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find = /[!'()~]|%20/g;

	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replacements[match];
	};

	var serialize = function (it) {
	  return replace$5(encodeURIComponent$1(it), find, replacer);
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$6(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    iterator: getIterator$2(getInternalParamsState(params).entries),
	    kind: kind
	  });
	}, 'Iterator', function next() {
	  var state = getInternalIteratorState(this);
	  var kind = state.kind;
	  var step = state.iterator.next();
	  var entry = step.value;
	  if (!step.done) {
	    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
	  } return step;
	}, true);

	var URLSearchParamsState = function (init) {
	  this.entries = [];
	  this.url = null;

	  if (init !== undefined) {
	    if (isObject$e(init)) this.parseObject(init);
	    else this.parseQuery(typeof init == 'string' ? charAt$4(init, 0) === '?' ? stringSlice$7(init, 1) : init : $toString$2(init));
	  }
	};

	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function (url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function (object) {
	    var iteratorMethod = getIteratorMethod$2(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;

	    if (iteratorMethod) {
	      iterator = getIterator$2(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call$c(next, iterator)).done) {
	        entryIterator = getIterator$2(anObject$9(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call$c(entryNext, entryIterator)).done ||
	          (second = call$c(entryNext, entryIterator)).done ||
	          !call$c(entryNext, entryIterator).done
	        ) throw TypeError$d('Expected sequence with length 2');
	        push$6(this.entries, { key: $toString$2(first.value), value: $toString$2(second.value) });
	      }
	    } else for (var key in object) if (hasOwn$9(object, key)) {
	      push$6(this.entries, { key: key, value: $toString$2(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var attributes = split$1(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split$1(attribute, '=');
	          push$6(this.entries, {
	            key: deserialize(shift$1(entry)),
	            value: deserialize(join$2(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function () {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push$6(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join$2(result, '&');
	  },
	  update: function () {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function () {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$6(this, URLSearchParamsPrototype);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  setInternalState$6(this, new URLSearchParamsState(init));
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	redefineAll$3(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    validateArgumentsLength$2(arguments.length, 2);
	    var state = getInternalParamsState(this);
	    push$6(state.entries, { key: $toString$2(name), value: $toString$2(value) });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var key = $toString$2(name);
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index].key === key) splice(entries, index, 1);
	      else index++;
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = $toString$2(name);
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = $toString$2(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push$6(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = $toString$2(name);
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index++].key === key) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString$2(name);
	    var val = $toString$2(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice(entries, index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push$6(entries, { key: key, value: val });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind$8(callback, arguments.length > 1 ? arguments[1] : undefined);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	redefine$7(URLSearchParamsPrototype, ITERATOR$2, URLSearchParamsPrototype.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	redefine$7(URLSearchParamsPrototype, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	setToStringTag$5(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$$n({ global: true, forced: !USE_NATIVE_URL$1 }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL$1 && isCallable$9(Headers)) {
	  var headersHas = uncurryThis$q(HeadersPrototype.has);
	  var headersSet = uncurryThis$q(HeadersPrototype.set);

	  var wrapRequestOptions = function (init) {
	    if (isObject$e(init)) {
	      var body = init.body;
	      var headers;
	      if (classof$8(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers(init.headers) : new Headers();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create$3(init, {
	          body: createPropertyDescriptor$2(0, $toString$2(body)),
	          headers: createPropertyDescriptor$2(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable$9(n$Fetch)) {
	    $$n({ global: true, enumerable: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable$9(N$Request)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance$6(this, RequestPrototype);
	      return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $$n({ global: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var web_urlSearchParams = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$m = _export;
	var DESCRIPTORS$a = descriptors;
	var USE_NATIVE_URL = nativeUrl;
	var global$E = global$19;
	var bind$7 = functionBindContext;
	var uncurryThis$p = functionUncurryThis;
	var defineProperties = objectDefineProperties.f;
	var redefine$6 = redefine$d.exports;
	var anInstance$5 = anInstance$7;
	var hasOwn$8 = hasOwnProperty_1;
	var assign = objectAssign;
	var arrayFrom = arrayFrom$1;
	var arraySlice$9 = arraySliceSimple;
	var codeAt = stringMultibyte.codeAt;
	var toASCII = stringPunycodeToAscii;
	var $toString$1 = toString$9;
	var setToStringTag$4 = setToStringTag$8;
	var validateArgumentsLength$1 = validateArgumentsLength$3;
	var URLSearchParamsModule = web_urlSearchParams;
	var InternalStateModule$5 = internalState;

	var setInternalState$5 = InternalStateModule$5.set;
	var getInternalURLState = InternalStateModule$5.getterFor('URL');
	var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = global$E.URL;
	var TypeError$c = global$E.TypeError;
	var parseInt$1 = global$E.parseInt;
	var floor$4 = Math.floor;
	var pow$1 = Math.pow;
	var charAt$3 = uncurryThis$p(''.charAt);
	var exec$2 = uncurryThis$p(/./.exec);
	var join$1 = uncurryThis$p([].join);
	var numberToString = uncurryThis$p(1.0.toString);
	var pop = uncurryThis$p([].pop);
	var push$5 = uncurryThis$p([].push);
	var replace$4 = uncurryThis$p(''.replace);
	var shift = uncurryThis$p([].shift);
	var split = uncurryThis$p(''.split);
	var stringSlice$6 = uncurryThis$p(''.slice);
	var toLowerCase = uncurryThis$p(''.toLowerCase);
	var unshift = uncurryThis$p([].unshift);

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[a-z]/i;
	// eslint-disable-next-line regexp/no-obscure-range -- safe
	var ALPHANUMERIC = /[\d+-.a-z]/i;
	var DIGIT = /\d/;
	var HEX_START = /^0x/i;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\da-f]+$/i;
	/* eslint-disable regexp/no-control-character -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
	var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
	/* eslint-enable regexp/no-control-character -- safe */
	var EOF;

	// https://url.spec.whatwg.org/#ipv4-number-parser
	var parseIPv4 = function (input) {
	  var parts = split(input, '.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] == '') {
	    parts.length--;
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part == '') return input;
	    radix = 10;
	    if (part.length > 1 && charAt$3(part, 0) == '0') {
	      radix = exec$2(HEX_START, part) ? 16 : 8;
	      part = stringSlice$6(part, radix == 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!exec$2(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
	      number = parseInt$1(part, radix);
	    }
	    push$5(numbers, number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index == partsLength - 1) {
	      if (number >= pow$1(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = pop(numbers);
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow$1(256, 3 - index);
	  }
	  return ipv4;
	};

	// https://url.spec.whatwg.org/#concept-ipv6-parser
	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var chr = function () {
	    return charAt$3(input, pointer);
	  };

	  if (chr() == ':') {
	    if (charAt$3(input, 1) != ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (chr()) {
	    if (pieceIndex == 8) return;
	    if (chr() == ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && exec$2(HEX, chr())) {
	      value = value * 16 + parseInt$1(chr(), 16);
	      pointer++;
	      length++;
	    }
	    if (chr() == '.') {
	      if (length == 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (chr()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (chr() == '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!exec$2(DIGIT, chr())) return;
	        while (exec$2(DIGIT, chr())) {
	          number = parseInt$1(chr(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece == 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
	      }
	      if (numbersSeen != 4) return;
	      break;
	    } else if (chr() == ':') {
	      pointer++;
	      if (!chr()) return;
	    } else if (chr()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex != 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex != 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};

	// https://url.spec.whatwg.org/#host-serializing
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      unshift(result, host % 256);
	      host = floor$4(host / 256);
	    } return join$1(result, '.');
	  // ipv6
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += numberToString(host[index], 16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (chr, set) {
	  var code = codeAt(chr, 0);
	  return code > 0x20 && code < 0x7F && !hasOwn$8(set, chr) ? chr : encodeURIComponent(chr);
	};

	// https://url.spec.whatwg.org/#special-scheme
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	// https://url.spec.whatwg.org/#windows-drive-letter
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length == 2 && exec$2(ALPHA, charAt$3(string, 0))
	    && ((second = charAt$3(string, 1)) == ':' || (!normalized && second == '|'));
	};

	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(stringSlice$6(string, 0, 2)) && (
	    string.length == 2 ||
	    ((third = charAt$3(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	// https://url.spec.whatwg.org/#single-dot-path-segment
	var isSingleDot = function (segment) {
	  return segment === '.' || toLowerCase(segment) === '%2e';
	};

	// https://url.spec.whatwg.org/#double-dot-path-segment
	var isDoubleDot = function (segment) {
	  segment = toLowerCase(segment);
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	var URLState = function (url, isBase, base) {
	  var urlString = $toString$1(url);
	  var baseState, failure, searchParams;
	  if (isBase) {
	    failure = this.parse(urlString);
	    if (failure) throw TypeError$c(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw TypeError$c(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
	    searchParams.bindURL(this);
	    this.searchParams = searchParams;
	  }
	};

	URLState.prototype = {
	  type: 'URL',
	  // https://url.spec.whatwg.org/#url-parsing
	  // eslint-disable-next-line max-statements -- TODO
	  parse: function (input, stateOverride, base) {
	    var url = this;
	    var state = stateOverride || SCHEME_START;
	    var pointer = 0;
	    var buffer = '';
	    var seenAt = false;
	    var seenBracket = false;
	    var seenPasswordToken = false;
	    var codePoints, chr, bufferCodePoints, failure;

	    input = $toString$1(input);

	    if (!stateOverride) {
	      url.scheme = '';
	      url.username = '';
	      url.password = '';
	      url.host = null;
	      url.port = null;
	      url.path = [];
	      url.query = null;
	      url.fragment = null;
	      url.cannotBeABaseURL = false;
	      input = replace$4(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
	    }

	    input = replace$4(input, TAB_AND_NEW_LINE, '');

	    codePoints = arrayFrom(input);

	    while (pointer <= codePoints.length) {
	      chr = codePoints[pointer];
	      switch (state) {
	        case SCHEME_START:
	          if (chr && exec$2(ALPHA, chr)) {
	            buffer += toLowerCase(chr);
	            state = SCHEME;
	          } else if (!stateOverride) {
	            state = NO_SCHEME;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case SCHEME:
	          if (chr && (exec$2(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
	            buffer += toLowerCase(chr);
	          } else if (chr == ':') {
	            if (stateOverride && (
	              (url.isSpecial() != hasOwn$8(specialSchemes, buffer)) ||
	              (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
	              (url.scheme == 'file' && !url.host)
	            )) return;
	            url.scheme = buffer;
	            if (stateOverride) {
	              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
	              return;
	            }
	            buffer = '';
	            if (url.scheme == 'file') {
	              state = FILE;
	            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
	            } else if (url.isSpecial()) {
	              state = SPECIAL_AUTHORITY_SLASHES;
	            } else if (codePoints[pointer + 1] == '/') {
	              state = PATH_OR_AUTHORITY;
	              pointer++;
	            } else {
	              url.cannotBeABaseURL = true;
	              push$5(url.path, '');
	              state = CANNOT_BE_A_BASE_URL_PATH;
	            }
	          } else if (!stateOverride) {
	            buffer = '';
	            state = NO_SCHEME;
	            pointer = 0;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case NO_SCHEME:
	          if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
	          if (base.cannotBeABaseURL && chr == '#') {
	            url.scheme = base.scheme;
	            url.path = arraySlice$9(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            url.cannotBeABaseURL = true;
	            state = FRAGMENT;
	            break;
	          }
	          state = base.scheme == 'file' ? FILE : RELATIVE;
	          continue;

	        case SPECIAL_RELATIVE_OR_AUTHORITY:
	          if (chr == '/' && codePoints[pointer + 1] == '/') {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	            pointer++;
	          } else {
	            state = RELATIVE;
	            continue;
	          } break;

	        case PATH_OR_AUTHORITY:
	          if (chr == '/') {
	            state = AUTHORITY;
	            break;
	          } else {
	            state = PATH;
	            continue;
	          }

	        case RELATIVE:
	          url.scheme = base.scheme;
	          if (chr == EOF) {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$9(base.path);
	            url.query = base.query;
	          } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
	            state = RELATIVE_SLASH;
	          } else if (chr == '?') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$9(base.path);
	            url.query = '';
	            state = QUERY;
	          } else if (chr == '#') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$9(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$9(base.path);
	            url.path.length--;
	            state = PATH;
	            continue;
	          } break;

	        case RELATIVE_SLASH:
	          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          } else if (chr == '/') {
	            state = AUTHORITY;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            state = PATH;
	            continue;
	          } break;

	        case SPECIAL_AUTHORITY_SLASHES:
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          if (chr != '/' || charAt$3(buffer, pointer + 1) != '/') continue;
	          pointer++;
	          break;

	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	          if (chr != '/' && chr != '\\') {
	            state = AUTHORITY;
	            continue;
	          } break;

	        case AUTHORITY:
	          if (chr == '@') {
	            if (seenAt) buffer = '%40' + buffer;
	            seenAt = true;
	            bufferCodePoints = arrayFrom(buffer);
	            for (var i = 0; i < bufferCodePoints.length; i++) {
	              var codePoint = bufferCodePoints[i];
	              if (codePoint == ':' && !seenPasswordToken) {
	                seenPasswordToken = true;
	                continue;
	              }
	              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	              if (seenPasswordToken) url.password += encodedCodePoints;
	              else url.username += encodedCodePoints;
	            }
	            buffer = '';
	          } else if (
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial())
	          ) {
	            if (seenAt && buffer == '') return INVALID_AUTHORITY;
	            pointer -= arrayFrom(buffer).length + 1;
	            buffer = '';
	            state = HOST;
	          } else buffer += chr;
	          break;

	        case HOST:
	        case HOSTNAME:
	          if (stateOverride && url.scheme == 'file') {
	            state = FILE_HOST;
	            continue;
	          } else if (chr == ':' && !seenBracket) {
	            if (buffer == '') return INVALID_HOST;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PORT;
	            if (stateOverride == HOSTNAME) return;
	          } else if (
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial())
	          ) {
	            if (url.isSpecial() && buffer == '') return INVALID_HOST;
	            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PATH_START;
	            if (stateOverride) return;
	            continue;
	          } else {
	            if (chr == '[') seenBracket = true;
	            else if (chr == ']') seenBracket = false;
	            buffer += chr;
	          } break;

	        case PORT:
	          if (exec$2(DIGIT, chr)) {
	            buffer += chr;
	          } else if (
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial()) ||
	            stateOverride
	          ) {
	            if (buffer != '') {
	              var port = parseInt$1(buffer, 10);
	              if (port > 0xFFFF) return INVALID_PORT;
	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
	              buffer = '';
	            }
	            if (stateOverride) return;
	            state = PATH_START;
	            continue;
	          } else return INVALID_PORT;
	          break;

	        case FILE:
	          url.scheme = 'file';
	          if (chr == '/' || chr == '\\') state = FILE_SLASH;
	          else if (base && base.scheme == 'file') {
	            if (chr == EOF) {
	              url.host = base.host;
	              url.path = arraySlice$9(base.path);
	              url.query = base.query;
	            } else if (chr == '?') {
	              url.host = base.host;
	              url.path = arraySlice$9(base.path);
	              url.query = '';
	              state = QUERY;
	            } else if (chr == '#') {
	              url.host = base.host;
	              url.path = arraySlice$9(base.path);
	              url.query = base.query;
	              url.fragment = '';
	              state = FRAGMENT;
	            } else {
	              if (!startsWithWindowsDriveLetter(join$1(arraySlice$9(codePoints, pointer), ''))) {
	                url.host = base.host;
	                url.path = arraySlice$9(base.path);
	                url.shortenPath();
	              }
	              state = PATH;
	              continue;
	            }
	          } else {
	            state = PATH;
	            continue;
	          } break;

	        case FILE_SLASH:
	          if (chr == '/' || chr == '\\') {
	            state = FILE_HOST;
	            break;
	          }
	          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join$1(arraySlice$9(codePoints, pointer), ''))) {
	            if (isWindowsDriveLetter(base.path[0], true)) push$5(url.path, base.path[0]);
	            else url.host = base.host;
	          }
	          state = PATH;
	          continue;

	        case FILE_HOST:
	          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
	              state = PATH;
	            } else if (buffer == '') {
	              url.host = '';
	              if (stateOverride) return;
	              state = PATH_START;
	            } else {
	              failure = url.parseHost(buffer);
	              if (failure) return failure;
	              if (url.host == 'localhost') url.host = '';
	              if (stateOverride) return;
	              buffer = '';
	              state = PATH_START;
	            } continue;
	          } else buffer += chr;
	          break;

	        case PATH_START:
	          if (url.isSpecial()) {
	            state = PATH;
	            if (chr != '/' && chr != '\\') continue;
	          } else if (!stateOverride && chr == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (!stateOverride && chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            state = PATH;
	            if (chr != '/') continue;
	          } break;

	        case PATH:
	          if (
	            chr == EOF || chr == '/' ||
	            (chr == '\\' && url.isSpecial()) ||
	            (!stateOverride && (chr == '?' || chr == '#'))
	          ) {
	            if (isDoubleDot(buffer)) {
	              url.shortenPath();
	              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
	                push$5(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
	                push$5(url.path, '');
	              }
	            } else {
	              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host) url.host = '';
	                buffer = charAt$3(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push$5(url.path, buffer);
	            }
	            buffer = '';
	            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
	              while (url.path.length > 1 && url.path[0] === '') {
	                shift(url.path);
	              }
	            }
	            if (chr == '?') {
	              url.query = '';
	              state = QUERY;
	            } else if (chr == '#') {
	              url.fragment = '';
	              state = FRAGMENT;
	            }
	          } else {
	            buffer += percentEncode(chr, pathPercentEncodeSet);
	          } break;

	        case CANNOT_BE_A_BASE_URL_PATH:
	          if (chr == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case QUERY:
	          if (!stateOverride && chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            if (chr == "'" && url.isSpecial()) url.query += '%27';
	            else if (chr == '#') url.query += '%23';
	            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case FRAGMENT:
	          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
	          break;
	      }

	      pointer++;
	    }
	  },
	  // https://url.spec.whatwg.org/#host-parsing
	  parseHost: function (input) {
	    var result, codePoints, index;
	    if (charAt$3(input, 0) == '[') {
	      if (charAt$3(input, input.length - 1) != ']') return INVALID_HOST;
	      result = parseIPv6(stringSlice$6(input, 1, -1));
	      if (!result) return INVALID_HOST;
	      this.host = result;
	    // opaque host
	    } else if (!this.isSpecial()) {
	      if (exec$2(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
	      result = '';
	      codePoints = arrayFrom(input);
	      for (index = 0; index < codePoints.length; index++) {
	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	      }
	      this.host = result;
	    } else {
	      input = toASCII(input);
	      if (exec$2(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
	      result = parseIPv4(input);
	      if (result === null) return INVALID_HOST;
	      this.host = result;
	    }
	  },
	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
	  cannotHaveUsernamePasswordPort: function () {
	    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
	  },
	  // https://url.spec.whatwg.org/#include-credentials
	  includesCredentials: function () {
	    return this.username != '' || this.password != '';
	  },
	  // https://url.spec.whatwg.org/#is-special
	  isSpecial: function () {
	    return hasOwn$8(specialSchemes, this.scheme);
	  },
	  // https://url.spec.whatwg.org/#shorten-a-urls-path
	  shortenPath: function () {
	    var path = this.path;
	    var pathSize = path.length;
	    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
	      path.length--;
	    }
	  },
	  // https://url.spec.whatwg.org/#concept-url-serializer
	  serialize: function () {
	    var url = this;
	    var scheme = url.scheme;
	    var username = url.username;
	    var password = url.password;
	    var host = url.host;
	    var port = url.port;
	    var path = url.path;
	    var query = url.query;
	    var fragment = url.fragment;
	    var output = scheme + ':';
	    if (host !== null) {
	      output += '//';
	      if (url.includesCredentials()) {
	        output += username + (password ? ':' + password : '') + '@';
	      }
	      output += serializeHost(host);
	      if (port !== null) output += ':' + port;
	    } else if (scheme == 'file') output += '//';
	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	    if (query !== null) output += '?' + query;
	    if (fragment !== null) output += '#' + fragment;
	    return output;
	  },
	  // https://url.spec.whatwg.org/#dom-url-href
	  setHref: function (href) {
	    var failure = this.parse(href);
	    if (failure) throw TypeError$c(failure);
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-origin
	  getOrigin: function () {
	    var scheme = this.scheme;
	    var port = this.port;
	    if (scheme == 'blob') try {
	      return new URLConstructor(scheme.path[0]).origin;
	    } catch (error) {
	      return 'null';
	    }
	    if (scheme == 'file' || !this.isSpecial()) return 'null';
	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
	  },
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  getProtocol: function () {
	    return this.scheme + ':';
	  },
	  setProtocol: function (protocol) {
	    this.parse($toString$1(protocol) + ':', SCHEME_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-username
	  getUsername: function () {
	    return this.username;
	  },
	  setUsername: function (username) {
	    var codePoints = arrayFrom($toString$1(username));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.username = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-password
	  getPassword: function () {
	    return this.password;
	  },
	  setPassword: function (password) {
	    var codePoints = arrayFrom($toString$1(password));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.password = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-host
	  getHost: function () {
	    var host = this.host;
	    var port = this.port;
	    return host === null ? ''
	      : port === null ? serializeHost(host)
	      : serializeHost(host) + ':' + port;
	  },
	  setHost: function (host) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(host, HOST);
	  },
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  getHostname: function () {
	    var host = this.host;
	    return host === null ? '' : serializeHost(host);
	  },
	  setHostname: function (hostname) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(hostname, HOSTNAME);
	  },
	  // https://url.spec.whatwg.org/#dom-url-port
	  getPort: function () {
	    var port = this.port;
	    return port === null ? '' : $toString$1(port);
	  },
	  setPort: function (port) {
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    port = $toString$1(port);
	    if (port == '') this.port = null;
	    else this.parse(port, PORT);
	  },
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  getPathname: function () {
	    var path = this.path;
	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	  },
	  setPathname: function (pathname) {
	    if (this.cannotBeABaseURL) return;
	    this.path = [];
	    this.parse(pathname, PATH_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-search
	  getSearch: function () {
	    var query = this.query;
	    return query ? '?' + query : '';
	  },
	  setSearch: function (search) {
	    search = $toString$1(search);
	    if (search == '') {
	      this.query = null;
	    } else {
	      if ('?' == charAt$3(search, 0)) search = stringSlice$6(search, 1);
	      this.query = '';
	      this.parse(search, QUERY);
	    }
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  getSearchParams: function () {
	    return this.searchParams.facade;
	  },
	  // https://url.spec.whatwg.org/#dom-url-hash
	  getHash: function () {
	    var fragment = this.fragment;
	    return fragment ? '#' + fragment : '';
	  },
	  setHash: function (hash) {
	    hash = $toString$1(hash);
	    if (hash == '') {
	      this.fragment = null;
	      return;
	    }
	    if ('#' == charAt$3(hash, 0)) hash = stringSlice$6(hash, 1);
	    this.fragment = '';
	    this.parse(hash, FRAGMENT);
	  },
	  update: function () {
	    this.query = this.searchParams.serialize() || null;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance$5(this, URLPrototype);
	  var base = validateArgumentsLength$1(arguments.length, 1) > 1 ? arguments[1] : undefined;
	  var state = setInternalState$5(that, new URLState(url, false, base));
	  if (!DESCRIPTORS$a) {
	    that.href = state.serialize();
	    that.origin = state.getOrigin();
	    that.protocol = state.getProtocol();
	    that.username = state.getUsername();
	    that.password = state.getPassword();
	    that.host = state.getHost();
	    that.hostname = state.getHostname();
	    that.port = state.getPort();
	    that.pathname = state.getPathname();
	    that.search = state.getSearch();
	    that.searchParams = state.getSearchParams();
	    that.hash = state.getHash();
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var accessorDescriptor = function (getter, setter) {
	  return {
	    get: function () {
	      return getInternalURLState(this)[getter]();
	    },
	    set: setter && function (value) {
	      return getInternalURLState(this)[setter](value);
	    },
	    configurable: true,
	    enumerable: true
	  };
	};

	if (DESCRIPTORS$a) {
	  defineProperties(URLPrototype, {
	    // `URL.prototype.href` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-href
	    href: accessorDescriptor('serialize', 'setHref'),
	    // `URL.prototype.origin` getter
	    // https://url.spec.whatwg.org/#dom-url-origin
	    origin: accessorDescriptor('getOrigin'),
	    // `URL.prototype.protocol` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-protocol
	    protocol: accessorDescriptor('getProtocol', 'setProtocol'),
	    // `URL.prototype.username` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-username
	    username: accessorDescriptor('getUsername', 'setUsername'),
	    // `URL.prototype.password` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-password
	    password: accessorDescriptor('getPassword', 'setPassword'),
	    // `URL.prototype.host` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-host
	    host: accessorDescriptor('getHost', 'setHost'),
	    // `URL.prototype.hostname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hostname
	    hostname: accessorDescriptor('getHostname', 'setHostname'),
	    // `URL.prototype.port` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-port
	    port: accessorDescriptor('getPort', 'setPort'),
	    // `URL.prototype.pathname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-pathname
	    pathname: accessorDescriptor('getPathname', 'setPathname'),
	    // `URL.prototype.search` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-search
	    search: accessorDescriptor('getSearch', 'setSearch'),
	    // `URL.prototype.searchParams` getter
	    // https://url.spec.whatwg.org/#dom-url-searchparams
	    searchParams: accessorDescriptor('getSearchParams'),
	    // `URL.prototype.hash` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hash
	    hash: accessorDescriptor('getHash', 'setHash')
	  });
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	redefine$6(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	redefine$6(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) redefine$6(URLConstructor, 'createObjectURL', bind$7(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) redefine$6(URLConstructor, 'revokeObjectURL', bind$7(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag$4(URLConstructor, 'URL');

	$$m({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$a }, {
	  URL: URLConstructor
	});

	var b = function b(_b) {
	  if ("function" == typeof URL.createObjectURL) {
	    var d = function d() {
	      return URL.createObjectURL(new Blob([atob("dmFyIG49InVuZGVmaW5lZCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6InVuZGVmaW5lZCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OiJ1bmRlZmluZWQiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDoidW5kZWZpbmVkIiE9dHlwZW9mIHNlbGY/c2VsZjp7fTshZnVuY3Rpb24oKXt2YXIgbj1mdW5jdGlvbihuKXt2YXIgcix0PU9iamVjdC5wcm90b3R5cGUsZT10Lmhhc093blByb3BlcnR5LGk9ImZ1bmN0aW9uIj09dHlwZW9mIFN5bWJvbD9TeW1ib2w6e30sbz1pLml0ZXJhdG9yfHwiQEBpdGVyYXRvciIsdT1pLmFzeW5jSXRlcmF0b3J8fCJAQGFzeW5jSXRlcmF0b3IiLGY9aS50b1N0cmluZ1RhZ3x8IkBAdG9TdHJpbmdUYWciO2Z1bmN0aW9uIGEobixyLHQpe3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkobixyLHt2YWx1ZTp0LHQ6ITAsaTohMCx3cml0YWJsZTohMH0pLG5bcl19dHJ5e2Eoe30sIiIpfWNhdGNoKG4pe2E9ZnVuY3Rpb24obixyLHQpe3JldHVybiBuW3JdPXR9fWZ1bmN0aW9uIGMobixyLHQsZSl7dmFyIGk9ciYmci5wcm90b3R5cGUgaW5zdGFuY2VvZiB3P3I6dyxvPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHU9bmV3IFIoZXx8W10pO3JldHVybiBvLm89ZnVuY3Rpb24obixyLHQpe3ZhciBlPXY7cmV0dXJuIGZ1bmN0aW9uKGksbyl7aWYoZT09PWwpdGhyb3cgRXJyb3IoIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmciKTtpZihlPT09ZCl7aWYoInRocm93Ij09PWkpdGhyb3cgbztyZXR1cm4gTSgpfWZvcih0Lm1ldGhvZD1pLHQudT1vOzspe3ZhciB1PXQudjtpZih1KXt2YXIgZj1PKHUsdCk7aWYoZil7aWYoZj09PXkpY29udGludWU7cmV0dXJuIGZ9fWlmKCJuZXh0Ij09PXQubWV0aG9kKXQuaD10Lmw9dC51O2Vsc2UgaWYoInRocm93Ij09PXQubWV0aG9kKXtpZihlPT09dil0aHJvdyBlPWQsdC51O3QucCh0LnUpfWVsc2UicmV0dXJuIj09PXQubWV0aG9kJiZ0LmcoInJldHVybiIsdC51KTtlPWw7dmFyIGE9cyhuLHIsdCk7aWYoIm5vcm1hbCI9PT1hLnR5cGUpe2lmKGU9dC5kb25lP2Q6aCxhLnU9PT15KWNvbnRpbnVlO3JldHVybnt2YWx1ZTphLnUsZG9uZTp0LmRvbmV9fSJ0aHJvdyI9PT1hLnR5cGUmJihlPWQsdC5tZXRob2Q9InRocm93Iix0LnU9YS51KX19fShuLHQsdSksb31mdW5jdGlvbiBzKG4scix0KXt0cnl7cmV0dXJue3R5cGU6Im5vcm1hbCIsdTpuLmNhbGwocix0KX19Y2F0Y2gobil7cmV0dXJue3R5cGU6InRocm93Iix1Om59fX1uLndyYXA9Yzt2YXIgdj0ic3VzcGVuZGVkU3RhcnQiLGg9InN1c3BlbmRlZFlpZWxkIixsPSJleGVjdXRpbmciLGQ9ImNvbXBsZXRlZCIseT17fTtmdW5jdGlvbiB3KCl7fWZ1bmN0aW9uIGIoKXt9ZnVuY3Rpb24gcCgpe312YXIgZz17fTthKGcsbywoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKTt2YXIgbT1PYmplY3QuZ2V0UHJvdG90eXBlT2YsQT1tJiZtKG0oVShbXSkpKTtBJiZBIT09dCYmZS5jYWxsKEEsbykmJihnPUEpO3ZhciBrPXAucHJvdG90eXBlPXcucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZyk7ZnVuY3Rpb24gUyhuKXtbIm5leHQiLCJ0aHJvdyIsInJldHVybiJdLmZvckVhY2goKGZ1bmN0aW9uKHIpe2EobixyLChmdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5vKHIsbil9KSl9KSl9ZnVuY3Rpb24gaihuLHIpe2Z1bmN0aW9uIHQoaSxvLHUsZil7dmFyIGE9cyhuW2ldLG4sbyk7aWYoInRocm93IiE9PWEudHlwZSl7dmFyIGM9YS51LHY9Yy52YWx1ZTtyZXR1cm4gdiYmIm9iamVjdCI9PXR5cGVvZiB2JiZlLmNhbGwodiwiX19hd2FpdCIpP3IucmVzb2x2ZSh2Lm0pLnRoZW4oKGZ1bmN0aW9uKG4pe3QoIm5leHQiLG4sdSxmKX0pLChmdW5jdGlvbihuKXt0KCJ0aHJvdyIsbix1LGYpfSkpOnIucmVzb2x2ZSh2KS50aGVuKChmdW5jdGlvbihuKXtjLnZhbHVlPW4sdShjKX0pLChmdW5jdGlvbihuKXtyZXR1cm4gdCgidGhyb3ciLG4sdSxmKX0pKX1mKGEudSl9dmFyIGk7dGhpcy5vPWZ1bmN0aW9uKG4sZSl7ZnVuY3Rpb24gbygpe3JldHVybiBuZXcgcigoZnVuY3Rpb24ocixpKXt0KG4sZSxyLGkpfSkpfXJldHVybiBpPWk/aS50aGVuKG8sbyk6bygpfX1mdW5jdGlvbiBPKG4sdCl7dmFyIGU9bi5pdGVyYXRvclt0Lm1ldGhvZF07aWYoZT09PXIpe2lmKHQudj1udWxsLCJ0aHJvdyI9PT10Lm1ldGhvZCl7aWYobi5pdGVyYXRvci5BJiYodC5tZXRob2Q9InJldHVybiIsdC51PXIsTyhuLHQpLCJ0aHJvdyI9PT10Lm1ldGhvZCkpcmV0dXJuIHk7dC5tZXRob2Q9InRocm93Iix0LnU9bmV3IFR5cGVFcnJvcigiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZCIpfXJldHVybiB5fXZhciBpPXMoZSxuLml0ZXJhdG9yLHQudSk7aWYoInRocm93Ij09PWkudHlwZSlyZXR1cm4gdC5tZXRob2Q9InRocm93Iix0LnU9aS51LHQudj1udWxsLHk7dmFyIG89aS51O3JldHVybiBvP28uZG9uZT8odFtuLmtdPW8udmFsdWUsdC5uZXh0PW4uUywicmV0dXJuIiE9PXQubWV0aG9kJiYodC5tZXRob2Q9Im5leHQiLHQudT1yKSx0LnY9bnVsbCx5KTpvOih0Lm1ldGhvZD0idGhyb3ciLHQudT1uZXcgVHlwZUVycm9yKCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdCIpLHQudj1udWxsLHkpfWZ1bmN0aW9uIEUobil7dmFyIHI9e2o6blswXX07MSBpbiBuJiYoci5PPW5bMV0pLDIgaW4gbiYmKHIuVD1uWzJdLHIuUj1uWzNdKSx0aGlzLlUucHVzaChyKX1mdW5jdGlvbiBUKG4pe3ZhciByPW4uTXx8e307ci50eXBlPSJub3JtYWwiLGRlbGV0ZSByLnUsbi5NPXJ9ZnVuY3Rpb24gUihuKXt0aGlzLlU9W3tqOiJyb290In1dLG4uZm9yRWFjaChFLHRoaXMpLHRoaXMucmVzZXQoITApfWZ1bmN0aW9uIFUobil7aWYobil7dmFyIHQ9bltvXTtpZih0KXJldHVybiB0LmNhbGwobik7aWYoImZ1bmN0aW9uIj09dHlwZW9mIG4ubmV4dClyZXR1cm4gbjtpZighaXNOYU4obi5sZW5ndGgpKXt2YXIgaT0tMSx1PWZ1bmN0aW9uIHQoKXtmb3IoOysraTxuLmxlbmd0aDspaWYoZS5jYWxsKG4saSkpcmV0dXJuIHQudmFsdWU9bltpXSx0LmRvbmU9ITEsdDtyZXR1cm4gdC52YWx1ZT1yLHQuZG9uZT0hMCx0fTtyZXR1cm4gdS5uZXh0PXV9fXJldHVybntuZXh0Ok19fWZ1bmN0aW9uIE0oKXtyZXR1cm57dmFsdWU6cixkb25lOiEwfX1yZXR1cm4gYi5wcm90b3R5cGU9cCxhKGssImNvbnN0cnVjdG9yIixwKSxhKHAsImNvbnN0cnVjdG9yIixiKSxiLmRpc3BsYXlOYW1lPWEocCxmLCJHZW5lcmF0b3JGdW5jdGlvbiIpLG4uST1mdW5jdGlvbihuKXt2YXIgcj0iZnVuY3Rpb24iPT10eXBlb2YgbiYmbi5jb25zdHJ1Y3RvcjtyZXR1cm4hIXImJihyPT09Ynx8IkdlbmVyYXRvckZ1bmN0aW9uIj09PShyLmRpc3BsYXlOYW1lfHxyLm5hbWUpKX0sbi5tYXJrPWZ1bmN0aW9uKG4pe3JldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKG4scCk6KG4uX19wcm90b19fPXAsYShuLGYsIkdlbmVyYXRvckZ1bmN0aW9uIikpLG4ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoayksbn0sbi5fPWZ1bmN0aW9uKG4pe3JldHVybnttOm59fSxTKGoucHJvdG90eXBlKSxhKGoucHJvdG90eXBlLHUsKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSksbi5MPWosbi5hc3luYz1mdW5jdGlvbihyLHQsZSxpLG8pe3ZvaWQgMD09PW8mJihvPVByb21pc2UpO3ZhciB1PW5ldyBqKGMocix0LGUsaSksbyk7cmV0dXJuIG4uSSh0KT91OnUubmV4dCgpLnRoZW4oKGZ1bmN0aW9uKG4pe3JldHVybiBuLmRvbmU/bi52YWx1ZTp1Lm5leHQoKX0pKX0sUyhrKSxhKGssZiwiR2VuZXJhdG9yIiksYShrLG8sKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSksYShrLCJ0b1N0cmluZyIsKGZ1bmN0aW9uKCl7cmV0dXJuIltvYmplY3QgR2VuZXJhdG9yXSJ9KSksbi5rZXlzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gci5yZXZlcnNlKCksZnVuY3Rpb24gdCgpe2Zvcig7ci5sZW5ndGg7KXt2YXIgZT1yLnBvcCgpO2lmKGUgaW4gbilyZXR1cm4gdC52YWx1ZT1lLHQuZG9uZT0hMSx0fXJldHVybiB0LmRvbmU9ITAsdH19LG4udmFsdWVzPVUsUi5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOlIscmVzZXQ6ZnVuY3Rpb24obil7aWYodGhpcy5QPTAsdGhpcy5uZXh0PTAsdGhpcy5oPXRoaXMubD1yLHRoaXMuZG9uZT0hMSx0aGlzLnY9bnVsbCx0aGlzLm1ldGhvZD0ibmV4dCIsdGhpcy51PXIsdGhpcy5VLmZvckVhY2goVCksIW4pZm9yKHZhciB0IGluIHRoaXMpInQiPT09dC5jaGFyQXQoMCkmJmUuY2FsbCh0aGlzLHQpJiYhaXNOYU4oK3Quc2xpY2UoMSkpJiYodGhpc1t0XT1yKX0sc3RvcDpmdW5jdGlvbigpe3RoaXMuZG9uZT0hMDt2YXIgbj10aGlzLlVbMF0uTTtpZigidGhyb3ciPT09bi50eXBlKXRocm93IG4udTtyZXR1cm4gdGhpcy5DfSxwOmZ1bmN0aW9uKG4pe2lmKHRoaXMuZG9uZSl0aHJvdyBuO3ZhciB0PXRoaXM7ZnVuY3Rpb24gaShlLGkpe3JldHVybiBmLnR5cGU9InRocm93IixmLnU9bix0Lm5leHQ9ZSxpJiYodC5tZXRob2Q9Im5leHQiLHQudT1yKSwhIWl9Zm9yKHZhciBvPXRoaXMuVS5sZW5ndGgtMTtvPj0wOy0tbyl7dmFyIHU9dGhpcy5VW29dLGY9dS5NO2lmKCJyb290Ij09PXUuailyZXR1cm4gaSgiZW5kIik7aWYodS5qPD10aGlzLlApe3ZhciBhPWUuY2FsbCh1LCJjYXRjaExvYyIpLGM9ZS5jYWxsKHUsImZpbmFsbHlMb2MiKTtpZihhJiZjKXtpZih0aGlzLlA8dS5PKXJldHVybiBpKHUuTywhMCk7aWYodGhpcy5QPHUuVClyZXR1cm4gaSh1LlQpfWVsc2UgaWYoYSl7aWYodGhpcy5QPHUuTylyZXR1cm4gaSh1Lk8sITApfWVsc2V7aWYoIWMpdGhyb3cgRXJyb3IoInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5Iik7aWYodGhpcy5QPHUuVClyZXR1cm4gaSh1LlQpfX19fSxnOmZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXRoaXMuVS5sZW5ndGgtMTt0Pj0wOy0tdCl7dmFyIGk9dGhpcy5VW3RdO2lmKGkuajw9dGhpcy5QJiZlLmNhbGwoaSwiZmluYWxseUxvYyIpJiZ0aGlzLlA8aS5UKXt2YXIgbz1pO2JyZWFrfX0hb3x8ImJyZWFrIiE9PW4mJiJjb250aW51ZSIhPT1ufHxvLmo+cnx8cj5vLlR8fChvPW51bGwpO3ZhciB1PW8/by5NOnt9O3JldHVybiB1LnR5cGU9bix1LnU9cixvPyh0aGlzLm1ldGhvZD0ibmV4dCIsdGhpcy5uZXh0PW8uVCx5KTp0aGlzLmNvbXBsZXRlKHUpfSxjb21wbGV0ZTpmdW5jdGlvbihuLHIpe2lmKCJ0aHJvdyI9PT1uLnR5cGUpdGhyb3cgbi51O3JldHVybiJicmVhayI9PT1uLnR5cGV8fCJjb250aW51ZSI9PT1uLnR5cGU/dGhpcy5uZXh0PW4udToicmV0dXJuIj09PW4udHlwZT8odGhpcy5DPXRoaXMudT1uLnUsdGhpcy5tZXRob2Q9InJldHVybiIsdGhpcy5uZXh0PSJlbmQiKToibm9ybWFsIj09PW4udHlwZSYmciYmKHRoaXMubmV4dD1yKSx5fSxmaW5pc2g6ZnVuY3Rpb24obil7Zm9yKHZhciByPXRoaXMuVS5sZW5ndGgtMTtyPj0wOy0tcil7dmFyIHQ9dGhpcy5VW3JdO2lmKHQuVD09PW4pcmV0dXJuIHRoaXMuY29tcGxldGUodC5NLHQuUiksVCh0KSx5fX0sY2F0Y2g6ZnVuY3Rpb24obil7Zm9yKHZhciByPXRoaXMuVS5sZW5ndGgtMTtyPj0wOy0tcil7dmFyIHQ9dGhpcy5VW3JdO2lmKHQuaj09PW4pe3ZhciBlPXQuTTtpZigidGhyb3ciPT09ZS50eXBlKXt2YXIgaT1lLnU7VCh0KX1yZXR1cm4gaX19dGhyb3cgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpfSxGOmZ1bmN0aW9uKG4sdCxlKXtyZXR1cm4gdGhpcy52PXtpdGVyYXRvcjpVKG4pLGs6dCxTOmV9LCJuZXh0Ij09PXRoaXMubWV0aG9kJiYodGhpcy51PXIpLHl9fSxufSh7fSk7dHJ5e3JlZ2VuZXJhdG9yUnVudGltZT1ufWNhdGNoKHIpeyJvYmplY3QiPT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZT1uOkZ1bmN0aW9uKCJyIiwicmVnZW5lcmF0b3JSdW50aW1lID0gciIpKG4pfX0oKTt2YXIgcj1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5NYXRoPT1NYXRoJiZufSx0PXIoIm9iamVjdCI9PXR5cGVvZiBnbG9iYWxUaGlzJiZnbG9iYWxUaGlzKXx8cigib2JqZWN0Ij09dHlwZW9mIHdpbmRvdyYmd2luZG93KXx8cigib2JqZWN0Ij09dHlwZW9mIHNlbGYmJnNlbGYpfHxyKCJvYmplY3QiPT10eXBlb2YgbiYmbil8fGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KCl8fEZ1bmN0aW9uKCJyZXR1cm4gdGhpcyIpKCksZT17fSxpPWZ1bmN0aW9uKG4pe3RyeXtyZXR1cm4hIW4oKX1jYXRjaChuKXtyZXR1cm4hMH19LG89IWkoKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwxLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KVsxXX0pKSx1PSFpKChmdW5jdGlvbigpe3ZhciBuPWZ1bmN0aW9uKCl7fS5iaW5kKCk7cmV0dXJuImZ1bmN0aW9uIiE9dHlwZW9mIG58fG4uaGFzT3duUHJvcGVydHkoInByb3RvdHlwZSIpfSkpLGY9ZnVuY3Rpb24oKXt9LmNhbGwsYT11P2YuYmluZChmKTpmdW5jdGlvbigpe3JldHVybiBmLmFwcGx5KGYsYXJndW1lbnRzKX0sYz17fSxzPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLHY9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixoPXYmJiFzLmNhbGwoezE6Mn0sMSk7Yy5mPWg/ZnVuY3Rpb24obil7dmFyIHI9dih0aGlzLG4pO3JldHVybiEhciYmci50fTpzO3ZhciBsLGQseT1mdW5jdGlvbihuLHIpe3JldHVybnt0OiEoMSZuKSxpOiEoMiZuKSx3cml0YWJsZTohKDQmbiksdmFsdWU6cn19LHc9dSxiPUZ1bmN0aW9uLnByb3RvdHlwZSxwPWIuYmluZCxnPWIuY2FsbCxtPXcmJnAuYmluZChnLGcpLEE9dz9mdW5jdGlvbihuKXtyZXR1cm4gbiYmbShuKX06ZnVuY3Rpb24obil7cmV0dXJuIG4mJmZ1bmN0aW9uKCl7cmV0dXJuIGcuYXBwbHkobixhcmd1bWVudHMpfX0saz1BLFM9ayh7fS50b1N0cmluZyksaj1rKCIiLnNsaWNlKSxPPWZ1bmN0aW9uKG4pe3JldHVybiBqKFMobiksOCwtMSl9LEU9QSxUPWksUj1PLFU9dC5PYmplY3QsTT1FKCIiLnNwbGl0KSxJPVQoKGZ1bmN0aW9uKCl7cmV0dXJuIVUoInoiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKX0pKT9mdW5jdGlvbihuKXtyZXR1cm4iU3RyaW5nIj09UihuKT9NKG4sIiIpOlUobil9OlUsXz10LlR5cGVFcnJvcix4PWZ1bmN0aW9uKG4pe2lmKG51bGw9PW4pdGhyb3cgXygiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIituKTtyZXR1cm4gbn0sTD1JLFA9eCxDPWZ1bmN0aW9uKG4pe3JldHVybiBMKFAobikpfSxGPWZ1bmN0aW9uKG4pe3JldHVybiJmdW5jdGlvbiI9PXR5cGVvZiBufSxOPUYsQj1mdW5jdGlvbihuKXtyZXR1cm4ib2JqZWN0Ij09dHlwZW9mIG4/bnVsbCE9PW46TihuKX0sRD10LEc9RixWPWZ1bmN0aW9uKG4pe3JldHVybiBHKG4pP246dm9pZCAwfSxZPWZ1bmN0aW9uKG4scil7cmV0dXJuIDI+YXJndW1lbnRzLmxlbmd0aD9WKERbbl0pOkRbbl0mJkRbbl1bcl19LHo9QSh7fS5pc1Byb3RvdHlwZU9mKSxXPVkoIm5hdmlnYXRvciIsInVzZXJBZ2VudCIpfHwiIixIPXQsJD1XLEs9SC5wcm9jZXNzLHE9SC5OLEo9SyYmSy5CfHxxJiZxLnZlcnNpb24sWD1KJiZKLkQ7WCYmKGQ9KGw9WC5zcGxpdCgiLiIpKVswXT4wJiY0PmxbMF0/MTorKGxbMF0rbFsxXSkpLCFkJiYkJiYoKGw9JC5tYXRjaCgvRWRnZVwvKFxkKykvKSkmJjc0PmxbMV18fChsPSQubWF0Y2goL0Nocm9tZVwvKFxkKykvKSkmJihkPStsWzFdKSk7dmFyIFE9ZCxaPVEsbm49ISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzJiYhaSgoZnVuY3Rpb24oKXt2YXIgbj1TeW1ib2woKTtyZXR1cm4hKG4rIiIpfHwhKE9iamVjdChuKWluc3RhbmNlb2YgU3ltYm9sKXx8IVN5bWJvbC5HJiZaJiY0MT5afSkpLHJuPW5uJiYhU3ltYm9sLkcmJiJzeW1ib2wiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yLHRuPVksZW49Rixvbj16LHVuPXJuLGZuPXQuT2JqZWN0LGFuPXVuP2Z1bmN0aW9uKG4pe3JldHVybiJzeW1ib2wiPT10eXBlb2Ygbn06ZnVuY3Rpb24obil7dmFyIHI9dG4oIlN5bWJvbCIpO3JldHVybiBlbihyKSYmb24oci5wcm90b3R5cGUsZm4obikpfSxjbj10LlN0cmluZyxzbj1mdW5jdGlvbihuKXt0cnl7cmV0dXJuIGNuKG4pfWNhdGNoKG4pe3JldHVybiJPYmplY3QifX0sdm49Rixobj1zbixsbj10LlR5cGVFcnJvcixkbj1mdW5jdGlvbihuKXtpZih2bihuKSlyZXR1cm4gbjt0aHJvdyBsbihobihuKSsiIGlzIG5vdCBhIGZ1bmN0aW9uIil9LHluPWRuLHduPWZ1bmN0aW9uKG4scil7dmFyIHQ9bltyXTtyZXR1cm4gbnVsbD09dD92b2lkIDA6eW4odCl9LGJuPWEscG49Rixnbj1CLG1uPXQuVHlwZUVycm9yLEFuPXtleHBvcnRzOnt9fSxrbj10LFNuPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxqbj1mdW5jdGlvbihuLHIpe3RyeXtTbihrbixuLHt2YWx1ZTpyLGk6ITAsd3JpdGFibGU6ITB9KX1jYXRjaCh0KXtrbltuXT1yfXJldHVybiByfSxPbj1qbixFbj10WyJWIl18fE9uKCJfX2NvcmUtanNfc2hhcmVkX18iLHt9KSxUbj1FbjsoQW4uZXhwb3J0cz1mdW5jdGlvbihuLHIpe3JldHVybiBUbltuXXx8KFRuW25dPXZvaWQgMCE9PXI/cjp7fSl9KSgidmVyc2lvbnMiLFtdKS5wdXNoKHt2ZXJzaW9uOiIzLjIxLjEiLG1vZGU6Imdsb2JhbCIsWToiwqkgMjAxNC0yMDIyIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpIixXOiJodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9ibG9iL3YzLjIxLjEvTElDRU5TRSIsc291cmNlOiJodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcyJ9KTt2YXIgUm49eCxVbj10Lk9iamVjdCxNbj1mdW5jdGlvbihuKXtyZXR1cm4gVW4oUm4obikpfSxJbj1Nbixfbj1BKHt9Lmhhc093blByb3BlcnR5KSx4bj1PYmplY3QuaGFzT3dufHxmdW5jdGlvbihuLHIpe3JldHVybiBfbihJbihuKSxyKX0sTG49QSxQbj0wLENuPU1hdGgucmFuZG9tKCksRm49TG4oMS4udG9TdHJpbmcpLE5uPWZ1bmN0aW9uKG4pe3JldHVybiJTeW1ib2woIisodm9pZCAwPT09bj8iIjpuKSsiKV8iK0ZuKCsrUG4rQ24sMzYpfSxCbj10LERuPUFuLmV4cG9ydHMsR249eG4sVm49Tm4sWW49bm4sem49cm4sV249RG4oIndrcyIpLEhuPUJuLlN5bWJvbCwkbj1IbiYmSG4uZm9yLEtuPXpuP0huOkhuJiZIbi5IfHxWbixxbj1mdW5jdGlvbihuKXtpZighR24oV24sbil8fCFZbiYmInN0cmluZyIhPXR5cGVvZiBXbltuXSl7dmFyIHI9IlN5bWJvbC4iK247WW4mJkduKEhuLG4pP1duW25dPUhuW25dOlduW25dPXpuJiYkbj8kbihyKTpLbihyKX1yZXR1cm4gV25bbl19LEpuPWEsWG49QixRbj1hbixabj13bixucj1xbixycj10LlR5cGVFcnJvcix0cj1ucigidG9QcmltaXRpdmUiKSxlcj1hbixpcj1mdW5jdGlvbihuKXt2YXIgcj1mdW5jdGlvbihuLHIpe2lmKCFYbihuKXx8UW4obikpcmV0dXJuIG47dmFyIHQsZT1abihuLHRyKTtpZihlKXtpZih2b2lkIDA9PT1yJiYocj0iZGVmYXVsdCIpLHQ9Sm4oZSxuLHIpLCFYbih0KXx8UW4odCkpcmV0dXJuIHQ7dGhyb3cgcnIoIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZSIpfXJldHVybiB2b2lkIDA9PT1yJiYocj0ibnVtYmVyIiksZnVuY3Rpb24obixyKXt2YXIgdCxlO2lmKCJzdHJpbmciPT09ciYmcG4odD1uLnRvU3RyaW5nKSYmIWduKGU9Ym4odCxuKSkpcmV0dXJuIGU7aWYocG4odD1uLnZhbHVlT2YpJiYhZ24oZT1ibih0LG4pKSlyZXR1cm4gZTtpZigic3RyaW5nIiE9PXImJnBuKHQ9bi50b1N0cmluZykmJiFnbihlPWJuKHQsbikpKXJldHVybiBlO3Rocm93IG1uKCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWUiKX0obixyKX0obiwic3RyaW5nIik7cmV0dXJuIGVyKHIpP3I6cisiIn0sb3I9Qix1cj10LmRvY3VtZW50LGZyPW9yKHVyKSYmb3IodXIuY3JlYXRlRWxlbWVudCksYXI9ZnVuY3Rpb24obil7cmV0dXJuIGZyP3VyLmNyZWF0ZUVsZW1lbnQobik6e319LGNyPWFyLHNyPSFvJiYhaSgoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KGNyKCJkaXYiKSwiYSIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KSksdnI9byxocj1hLGxyPWMsZHI9eSx5cj1DLHdyPWlyLGJyPXhuLHByPXNyLGdyPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPXZyP2dyOmZ1bmN0aW9uKG4scil7aWYobj15cihuKSxyPXdyKHIpLHByKXRyeXtyZXR1cm4gZ3IobixyKX1jYXRjaChuKXt9aWYoYnIobixyKSlyZXR1cm4gZHIoIWhyKGxyLmYsbixyKSxuW3JdKX07dmFyIG1yPXt9LEFyPW8mJmkoKGZ1bmN0aW9uKCl7cmV0dXJuIDQyIT1PYmplY3QuZGVmaW5lUHJvcGVydHkoKGZ1bmN0aW9uKCl7fSksInByb3RvdHlwZSIse3ZhbHVlOjQyLHdyaXRhYmxlOiExfSkucHJvdG90eXBlfSkpLGtyPXQsU3I9Qixqcj1rci5TdHJpbmcsT3I9a3IuVHlwZUVycm9yLEVyPWZ1bmN0aW9uKG4pe2lmKFNyKG4pKXJldHVybiBuO3Rocm93IE9yKGpyKG4pKyIgaXMgbm90IGFuIG9iamVjdCIpfSxUcj1vLFJyPXNyLFVyPUFyLE1yPUVyLElyPWlyLF9yPXQuVHlwZUVycm9yLHhyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxMcj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO21yLmY9VHI/VXI/ZnVuY3Rpb24obixyLHQpe2lmKE1yKG4pLHI9SXIociksTXIodCksImZ1bmN0aW9uIj09dHlwZW9mIG4mJiJwcm90b3R5cGUiPT09ciYmInZhbHVlImluIHQmJiJ3cml0YWJsZSJpbiB0JiYhdC53cml0YWJsZSl7dmFyIGU9THIobixyKTtlJiZlLndyaXRhYmxlJiYobltyXT10LnZhbHVlLHQ9e2k6ImkiaW4gdD90Lmk6ZS5pLHQ6InQiaW4gdD90LnQ6ZS50LHdyaXRhYmxlOiExfSl9cmV0dXJuIHhyKG4scix0KX06eHI6ZnVuY3Rpb24obixyLHQpe2lmKE1yKG4pLHI9SXIociksTXIodCksUnIpdHJ5e3JldHVybiB4cihuLHIsdCl9Y2F0Y2gobil7fWlmKCJnZXQiaW4gdHx8InNldCJpbiB0KXRocm93IF9yKCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCIpO3JldHVybiJ2YWx1ZSJpbiB0JiYobltyXT10LnZhbHVlKSxufTt2YXIgUHI9bXIsQ3I9eSxGcj1vP2Z1bmN0aW9uKG4scix0KXtyZXR1cm4gUHIuZihuLHIsQ3IoMSx0KSl9OmZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbltyXT10LG59LE5yPXtleHBvcnRzOnt9fSxCcj1GLERyPUVuLEdyPUEoRnVuY3Rpb24udG9TdHJpbmcpO0JyKERyLiQpfHwoRHIuJD1mdW5jdGlvbihuKXtyZXR1cm4gR3Iobil9KTt2YXIgVnIsWXIsenIsV3I9RHIuJCxIcj1GLCRyPVdyLEtyPXQuV2Vha01hcCxxcj1IcihLcikmJi9uYXRpdmUgY29kZS8udGVzdCgkcihLcikpLEpyPUFuLmV4cG9ydHMsWHI9Tm4sUXI9SnIoImtleXMiKSxacj1mdW5jdGlvbihuKXtyZXR1cm4gUXJbbl18fChRcltuXT1YcihuKSl9LG50PXt9LHJ0PXFyLHR0PXQsZXQ9QSxpdD1CLG90PUZyLHV0PXhuLGZ0PUVuLGF0PVpyLGN0PW50LHN0PXR0LlR5cGVFcnJvcix2dD10dC5XZWFrTWFwO2lmKHJ0fHxmdC5zdGF0ZSl7dmFyIGh0PWZ0LnN0YXRlfHwoZnQuc3RhdGU9bmV3IHZ0KSxsdD1ldChodC5nZXQpLGR0PWV0KGh0LmhhcykseXQ9ZXQoaHQuc2V0KTtWcj1mdW5jdGlvbihuLHIpe2lmKGR0KGh0LG4pKXRocm93IG5ldyBzdCgiT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQiKTtyZXR1cm4gci5LPW4seXQoaHQsbixyKSxyfSxZcj1mdW5jdGlvbihuKXtyZXR1cm4gbHQoaHQsbil8fHt9fSx6cj1mdW5jdGlvbihuKXtyZXR1cm4gZHQoaHQsbil9fWVsc2V7dmFyIHd0PWF0KCJzdGF0ZSIpO2N0W3d0XT0hMCxWcj1mdW5jdGlvbihuLHIpe2lmKHV0KG4sd3QpKXRocm93IG5ldyBzdCgiT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQiKTtyZXR1cm4gci5LPW4sb3Qobix3dCxyKSxyfSxZcj1mdW5jdGlvbihuKXtyZXR1cm4gdXQobix3dCk/blt3dF06e319LHpyPWZ1bmN0aW9uKG4pe3JldHVybiB1dChuLHd0KX19dmFyIGJ0PXtzZXQ6VnIsZ2V0OllyLGhhczp6cixxOmZ1bmN0aW9uKG4pe3JldHVybiB6cihuKT9ZcihuKTpWcihuLHt9KX0sSjpmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIHQ7aWYoIWl0KHIpfHwodD1ZcihyKSkudHlwZSE9PW4pdGhyb3cgc3QoIkluY29tcGF0aWJsZSByZWNlaXZlciwgIituKyIgcmVxdWlyZWQiKTtyZXR1cm4gdH19fSxwdD1vLGd0PUZ1bmN0aW9uLnByb3RvdHlwZSxtdD1wdCYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixBdD14bihndCwibmFtZSIpLGt0PXtYOkF0LFo6QXQmJiExLG5uOkF0JiYoIXB0fHxwdCYmbXQoZ3QsIm5hbWUiKS5pKX0sU3Q9dCxqdD1GLE90PXhuLEV0PUZyLFR0PWpuLFJ0PVdyLFV0PWt0Lm5uLE10PWJ0LmdldCxJdD1idC5xLF90PShTdHJpbmcrIiIpLnNwbGl0KCJTdHJpbmciKTsoTnIuZXhwb3J0cz1mdW5jdGlvbihuLHIsdCxlKXt2YXIgaSxvPSEhZSYmISFlLnJuLHU9ISFlJiYhIWUudCxmPSEhZSYmISFlLnRuLGE9ZSYmdm9pZCAwIT09ZS5uYW1lP2UubmFtZTpyO2p0KHQpJiYoIlN5bWJvbCgiPT09KGErIiIpLnNsaWNlKDAsNykmJihhPSJbIisoYSsiIikucmVwbGFjZSgvXlN5bWJvbFwoKFteKV0qKVwpLywiJDEiKSsiXSIpLCghT3QodCwibmFtZSIpfHxVdCYmdC5uYW1lIT09YSkmJkV0KHQsIm5hbWUiLGEpLChpPUl0KHQpKS5zb3VyY2V8fChpLnNvdXJjZT1fdC5qb2luKCJzdHJpbmciPT10eXBlb2YgYT9hOiIiKSkpLG4hPT1TdD8obz8hZiYmbltyXSYmKHU9ITApOmRlbGV0ZSBuW3JdLHU/bltyXT10OkV0KG4scix0KSk6dT9uW3JdPXQ6VHQocix0KX0pKEZ1bmN0aW9uLnByb3RvdHlwZSwidG9TdHJpbmciLChmdW5jdGlvbigpe3JldHVybiBqdCh0aGlzKSYmTXQodGhpcykuc291cmNlfHxSdCh0aGlzKX0pKTt2YXIgeHQ9e30sTHQ9TWF0aC5jZWlsLFB0PU1hdGguZmxvb3IsQ3Q9ZnVuY3Rpb24obil7dmFyIHI9K247cmV0dXJuIHIhPXJ8fDA9PT1yPzA6KHI+MD9QdDpMdCkocil9LEZ0PUN0LE50PU1hdGgubWF4LEJ0PU1hdGgubWluLER0PWZ1bmN0aW9uKG4scil7dmFyIHQ9RnQobik7cmV0dXJuIDA+dD9OdCh0K3IsMCk6QnQodCxyKX0sR3Q9Q3QsVnQ9TWF0aC5taW4sWXQ9ZnVuY3Rpb24obil7cmV0dXJuIG4+MD9WdChHdChuKSw5MDA3MTk5MjU0NzQwOTkxKTowfSx6dD1ZdCxXdD1mdW5jdGlvbihuKXtyZXR1cm4genQobi5sZW5ndGgpfSxIdD1DLCR0PUR0LEt0PVd0LHF0PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihyLHQsZSl7dmFyIGksbz1IdChyKSx1PUt0KG8pLGY9JHQoZSx1KTtpZihuJiZ0IT10KXtmb3IoO3U+ZjspaWYoKGk9b1tmKytdKSE9aSlyZXR1cm4hMH1lbHNlIGZvcig7dT5mO2YrKylpZigobnx8ZiBpbiBvKSYmb1tmXT09PXQpcmV0dXJuIG58fGZ8fDA7cmV0dXJuIW4mJi0xfX0sSnQ9e2luY2x1ZGVzOnF0KCEwKSxpbmRleE9mOnF0KCExKX0sWHQ9eG4sUXQ9QyxadD1KdC5pbmRleE9mLG5lPW50LHJlPUEoW10ucHVzaCksdGU9ZnVuY3Rpb24obixyKXt2YXIgdCxlPVF0KG4pLGk9MCxvPVtdO2Zvcih0IGluIGUpIVh0KG5lLHQpJiZYdChlLHQpJiZyZShvLHQpO2Zvcig7ci5sZW5ndGg+aTspWHQoZSx0PXJbaSsrXSkmJih+WnQobyx0KXx8cmUobyx0KSk7cmV0dXJuIG99LGVlPVsiY29uc3RydWN0b3IiLCJoYXNPd25Qcm9wZXJ0eSIsImlzUHJvdG90eXBlT2YiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInRvTG9jYWxlU3RyaW5nIiwidG9TdHJpbmciLCJ2YWx1ZU9mIl0saWU9dGUsb2U9ZWUuY29uY2F0KCJsZW5ndGgiLCJwcm90b3R5cGUiKTt4dC5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbihuKXtyZXR1cm4gaWUobixvZSl9O3ZhciB1ZT17fTt1ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7dmFyIGZlPVksYWU9eHQsY2U9dWUsc2U9RXIsdmU9QShbXS5jb25jYXQpLGhlPWZlKCJSZWZsZWN0Iiwib3duS2V5cyIpfHxmdW5jdGlvbihuKXt2YXIgcj1hZS5mKHNlKG4pKSx0PWNlLmY7cmV0dXJuIHQ/dmUocix0KG4pKTpyfSxsZT14bixkZT1oZSx5ZT1lLHdlPW1yLGJlPWZ1bmN0aW9uKG4scix0KXtmb3IodmFyIGU9ZGUociksaT13ZS5mLG89eWUuZix1PTA7dTxlLmxlbmd0aDt1Kyspe3ZhciBmPWVbdV07bGUobixmKXx8dCYmbGUodCxmKXx8aShuLGYsbyhyLGYpKX19LHBlPWksZ2U9RixtZT0vI3xcLnByb3RvdHlwZVwuLyxBZT1mdW5jdGlvbihuLHIpe3ZhciB0PVNlW2tlKG4pXTtyZXR1cm4gdD09T2V8fHQhPWplJiYoZ2Uocik/cGUocik6ISFyKX0sa2U9QWUubm9ybWFsaXplPWZ1bmN0aW9uKG4pe3JldHVybihuKyIiKS5yZXBsYWNlKG1lLCIuIikudG9Mb3dlckNhc2UoKX0sU2U9QWUuZGF0YT17fSxqZT1BZS5lbj0iTiIsT2U9QWUub249IlAiLEVlPUFlLFRlPXQsUmU9ZS5mLFVlPUZyLE1lPU5yLmV4cG9ydHMsSWU9am4sX2U9YmUseGU9RWUsTGU9ZnVuY3Rpb24obixyKXt2YXIgdCxlLGksbyx1LGY9bi50YXJnZXQsYT1uLmdsb2JhbCxjPW4udW47aWYodD1hP1RlOmM/VGVbZl18fEllKGYse30pOihUZVtmXXx8e30pLnByb3RvdHlwZSlmb3IoZSBpbiByKXtpZihvPXJbZV0saT1uLnRuPyh1PVJlKHQsZSkpJiZ1LnZhbHVlOnRbZV0sIXhlKGE/ZTpmKyhjPyIuIjoiIyIpK2Usbi5mbikmJnZvaWQgMCE9PWkpe2lmKHR5cGVvZiBvPT10eXBlb2YgaSljb250aW51ZTtfZShvLGkpfShuLkd8fGkmJmkuRykmJlVlKG8sInNoYW0iLCEwKSxNZSh0LGUsbyxuKX19LFBlPXt9O1BlW3FuKCJ0b1N0cmluZ1RhZyIpXT0ieiI7dmFyIENlLEZlPVBlKyIiPT0iW29iamVjdCB6XSIsTmU9dCxCZT1GZSxEZT1GLEdlPU8sVmU9cW4oInRvU3RyaW5nVGFnIiksWWU9TmUuT2JqZWN0LHplPSJBcmd1bWVudHMiPT1HZShmdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHN9KCkpLFdlPUJlP0dlOmZ1bmN0aW9uKG4pe3ZhciByLHQsZTtyZXR1cm4gdm9pZCAwPT09bj8iVW5kZWZpbmVkIjpudWxsPT09bj8iTnVsbCI6InN0cmluZyI9PXR5cGVvZih0PWZ1bmN0aW9uKG4scil7dHJ5e3JldHVybiBuW3JdfWNhdGNoKG4pe319KHI9WWUobiksVmUpKT90OnplP0dlKHIpOiJPYmplY3QiPT0oZT1HZShyKSkmJkRlKHIuYW4pPyJBcmd1bWVudHMiOmV9LEhlPVdlLCRlPXQuU3RyaW5nLEtlPWZ1bmN0aW9uKG4pe2lmKCJTeW1ib2wiPT09SGUobikpdGhyb3cgVHlwZUVycm9yKCJDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZyIpO3JldHVybiAkZShuKX0scWU9QixKZT1PLFhlPXFuKCJtYXRjaCIpLFFlPXQuVHlwZUVycm9yLFplPXFuKCJtYXRjaCIpLG5pPUxlLHJpPUEsdGk9ZS5mLGVpPVl0LGlpPUtlLG9pPWZ1bmN0aW9uKG4pe2lmKGZ1bmN0aW9uKG4pe3ZhciByO3JldHVybiBxZShuKSYmKHZvaWQgMCE9PShyPW5bWGVdKT8hIXI6IlJlZ0V4cCI9PUplKG4pKX0obikpdGhyb3cgUWUoIlRoZSBtZXRob2QgZG9lc24ndCBhY2NlcHQgcmVndWxhciBleHByZXNzaW9ucyIpO3JldHVybiBufSx1aT14LGZpPXJpKCIiLnN0YXJ0c1dpdGgpLGFpPXJpKCIiLnNsaWNlKSxjaT1NYXRoLm1pbixzaT1mdW5jdGlvbigpe3ZhciBuPS8uLzt0cnl7Ii8uLyIuc3RhcnRzV2l0aChuKX1jYXRjaChyKXt0cnl7cmV0dXJuIG5bWmVdPSExLCIvLi8iLnN0YXJ0c1dpdGgobil9Y2F0Y2gobil7fX1yZXR1cm4hMX0oKTtuaSh7dGFyZ2V0OiJTdHJpbmciLGNuOiEwLGZuOiEoIXNpJiYoQ2U9dGkoU3RyaW5nLnByb3RvdHlwZSwic3RhcnRzV2l0aCIpLENlJiYhQ2Uud3JpdGFibGUpfHxzaSl9LHtzdGFydHNXaXRoOmZ1bmN0aW9uKG4pe3ZhciByPWlpKHVpKHRoaXMpKTtvaShuKTt2YXIgdD1laShjaShhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCxyLmxlbmd0aCkpLGU9aWkobik7cmV0dXJuIGZpP2ZpKHIsZSx0KTphaShyLHQsdCtlLmxlbmd0aCk9PT1lfX0pO3ZhciB2aT17fSxoaT10ZSxsaT1lZSxkaT1PYmplY3Qua2V5c3x8ZnVuY3Rpb24obil7cmV0dXJuIGhpKG4sbGkpfSx5aT1vLHdpPUFyLGJpPW1yLHBpPUVyLGdpPUMsbWk9ZGk7dmkuZj15aSYmIXdpP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzOmZ1bmN0aW9uKG4scil7cGkobik7Zm9yKHZhciB0LGU9Z2kociksaT1taShyKSxvPWkubGVuZ3RoLHU9MDtvPnU7KWJpLmYobix0PWlbdSsrXSxlW3RdKTtyZXR1cm4gbn07dmFyIEFpLGtpPVkoImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiksU2k9RXIsamk9dmksT2k9ZWUsRWk9bnQsVGk9a2ksUmk9YXIsVWk9WnIoIklFX1BST1RPIiksTWk9ZnVuY3Rpb24oKXt9LElpPWZ1bmN0aW9uKG4pe3JldHVybiI8c2NyaXB0PiIrbisiPFwvc2NyaXB0PiJ9LF9pPWZ1bmN0aW9uKG4pe24ud3JpdGUoSWkoIiIpKSxuLmNsb3NlKCk7dmFyIHI9bi5wYXJlbnRXaW5kb3cuT2JqZWN0O3JldHVybiBuPW51bGwscn0seGk9ZnVuY3Rpb24oKXt0cnl7QWk9bmV3IEFjdGl2ZVhPYmplY3QoImh0bWxmaWxlIil9Y2F0Y2gobil7fXZhciBuLHI7eGk9InVuZGVmaW5lZCIhPXR5cGVvZiBkb2N1bWVudD9kb2N1bWVudC5kb21haW4mJkFpP19pKEFpKTooKHI9UmkoImlmcmFtZSIpKS5zdHlsZS5kaXNwbGF5PSJub25lIixUaS5hcHBlbmRDaGlsZChyKSxyLnNyYz0iamF2YXNjcmlwdDoiLChuPXIuY29udGVudFdpbmRvdy5kb2N1bWVudCkub3BlbigpLG4ud3JpdGUoSWkoImRvY3VtZW50LkY9T2JqZWN0IikpLG4uY2xvc2UoKSxuLnNuKTpfaShBaSk7Zm9yKHZhciB0PU9pLmxlbmd0aDt0LS07KWRlbGV0ZSB4aS5wcm90b3R5cGVbT2lbdF1dO3JldHVybiB4aSgpfTtFaVtVaV09ITA7dmFyIExpPU9iamVjdC5jcmVhdGV8fGZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIG51bGwhPT1uPyhNaS5wcm90b3R5cGU9U2kobiksdD1uZXcgTWksTWkucHJvdG90eXBlPW51bGwsdFtVaV09bik6dD14aSgpLHZvaWQgMD09PXI/dDpqaS5mKHQscil9LFBpPUxpLENpPW1yLEZpPXFuKCJ1bnNjb3BhYmxlcyIpLE5pPUFycmF5LnByb3RvdHlwZTtudWxsPT1OaVtGaV0mJkNpLmYoTmksRmkse2k6ITAsdmFsdWU6UGkobnVsbCl9KTt2YXIgQmksRGksR2ksVmk9ZnVuY3Rpb24obil7TmlbRmldW25dPSEwfSxZaT17fSx6aT0haSgoZnVuY3Rpb24oKXtmdW5jdGlvbiBuKCl7fXJldHVybiBuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1udWxsLE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgbikhPT1uLnByb3RvdHlwZX0pKSxXaT10LEhpPXhuLCRpPUYsS2k9TW4scWk9emksSmk9WnIoIklFX1BST1RPIiksWGk9V2kuT2JqZWN0LFFpPVhpLnByb3RvdHlwZSxaaT1xaT9YaS5nZXRQcm90b3R5cGVPZjpmdW5jdGlvbihuKXt2YXIgcj1LaShuKTtpZihIaShyLEppKSlyZXR1cm4gcltKaV07dmFyIHQ9ci5jb25zdHJ1Y3RvcjtyZXR1cm4gJGkodCkmJnIgaW5zdGFuY2VvZiB0P3QucHJvdG90eXBlOnIgaW5zdGFuY2VvZiBYaT9RaTpudWxsfSxubz1pLHJvPUYsdG89WmksZW89TnIuZXhwb3J0cyxpbz1xbigiaXRlcmF0b3IiKSxvbz0hMTtbXS5rZXlzJiYoIm5leHQiaW4oR2k9W10ua2V5cygpKT8oRGk9dG8odG8oR2kpKSkhPT1PYmplY3QucHJvdG90eXBlJiYoQmk9RGkpOm9vPSEwKTt2YXIgdW89bnVsbD09Qml8fG5vKChmdW5jdGlvbigpe3ZhciBuPXt9O3JldHVybiBCaVtpb10uY2FsbChuKSE9PW59KSk7dW8mJihCaT17fSkscm8oQmlbaW9dKXx8ZW8oQmksaW8sKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSk7dmFyIGZvPXt2bjpCaSxobjpvb30sYW89bXIuZixjbz14bixzbz1xbigidG9TdHJpbmdUYWciKSx2bz1mdW5jdGlvbihuLHIsdCl7biYmIXQmJihuPW4ucHJvdG90eXBlKSxuJiYhY28obixzbykmJmFvKG4sc28se2k6ITAsdmFsdWU6cn0pfSxobz1mby52bixsbz1MaSx5bz15LHdvPXZvLGJvPVlpLHBvPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LGdvPXQsbW89RixBbz1nby5TdHJpbmcsa289Z28uVHlwZUVycm9yLFNvPUEsam89RXIsT289T2JqZWN0LnNldFByb3RvdHlwZU9mfHwoIl9fcHJvdG9fXyJpbnt9P2Z1bmN0aW9uKCl7dmFyIG4scj0hMSx0PXt9O3RyeXsobj1TbyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsIl9fcHJvdG9fXyIpLnNldCkpKHQsW10pLHI9dCBpbnN0YW5jZW9mIEFycmF5fWNhdGNoKG4pe31yZXR1cm4gZnVuY3Rpb24odCxlKXtyZXR1cm4gam8odCksZnVuY3Rpb24obil7aWYoIm9iamVjdCI9PXR5cGVvZiBufHxtbyhuKSlyZXR1cm4gbjt0aHJvdyBrbygiQ2FuJ3Qgc2V0ICIrQW8obikrIiBhcyBhIHByb3RvdHlwZSIpfShlKSxyP24odCxlKTp0Ll9fcHJvdG9fXz1lLHR9fSgpOnZvaWQgMCksRW89TGUsVG89YSxSbz1rdCxVbz1GLE1vPVppLElvPU9vLF9vPXZvLHhvPUZyLExvPU5yLmV4cG9ydHMsUG89WWksQ289Um8uWixGbz1Sby5ubixObz1mby52bixCbz1mby5obixEbz1xbigiaXRlcmF0b3IiKSxHbz1mdW5jdGlvbigpe3JldHVybiB0aGlzfSxWbz1mdW5jdGlvbihuLHIsdCxlLGksbyx1KXshZnVuY3Rpb24obixyLHQpe3ZhciBlPXIrIiBJdGVyYXRvciI7bi5wcm90b3R5cGU9bG8oaG8se25leHQ6eW8oMSx0KX0pLHdvKG4sZSwhMSksYm9bZV09cG99KHQscixlKTt2YXIgZixhLGMscz1mdW5jdGlvbihuKXtpZihuPT09aSYmeSlyZXR1cm4geTtpZighQm8mJm4gaW4gbClyZXR1cm4gbFtuXTtzd2l0Y2gobil7Y2FzZSJrZXlzIjpjYXNlInZhbHVlcyI6Y2FzZSJlbnRyaWVzIjpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHQodGhpcyxuKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB0KHRoaXMpfX0sdj1yKyIgSXRlcmF0b3IiLGg9ITEsbD1uLnByb3RvdHlwZSxkPWxbRG9dfHxsWyJAQGl0ZXJhdG9yIl18fGkmJmxbaV0seT0hQm8mJmR8fHMoaSksdz0iQXJyYXkiPT1yJiZsLmVudHJpZXN8fGQ7aWYodyYmKGY9TW8ody5jYWxsKG5ldyBuKSkpIT09T2JqZWN0LnByb3RvdHlwZSYmZi5uZXh0JiYoTW8oZikhPT1ObyYmKElvP0lvKGYsTm8pOlVvKGZbRG9dKXx8TG8oZixEbyxHbykpLF9vKGYsdiwhMCkpLENvJiYidmFsdWVzIj09aSYmZCYmInZhbHVlcyIhPT1kLm5hbWUmJihGbz94byhsLCJuYW1lIiwidmFsdWVzIik6KGg9ITAseT1mdW5jdGlvbigpe3JldHVybiBUbyhkLHRoaXMpfSkpLGkpaWYoYT17dmFsdWVzOnMoInZhbHVlcyIpLGtleXM6bz95OnMoImtleXMiKSxlbnRyaWVzOnMoImVudHJpZXMiKX0sdSlmb3IoYyBpbiBhKShCb3x8aHx8IShjIGluIGwpKSYmTG8obCxjLGFbY10pO2Vsc2UgRW8oe3RhcmdldDpyLGNuOiEwLGZuOkJvfHxofSxhKTtyZXR1cm4gbFtEb10hPT15JiZMbyhsLERvLHkse25hbWU6aX0pLFBvW3JdPXksYX0sWW89Qyx6bz1WaSxXbz1ZaSxIbz1idCwkbz1tci5mLEtvPVZvLHFvPW8sSm89SG8uc2V0LFhvPUhvLkooIkFycmF5IEl0ZXJhdG9yIiksUW89S28oQXJyYXksIkFycmF5IiwoZnVuY3Rpb24obixyKXtKbyh0aGlzLHt0eXBlOiJBcnJheSBJdGVyYXRvciIsdGFyZ2V0OllvKG4pLGluZGV4OjAsa2luZDpyfSl9KSwoZnVuY3Rpb24oKXt2YXIgbj1Ybyh0aGlzKSxyPW4udGFyZ2V0LHQ9bi5raW5kLGU9bi5pbmRleCsrO3JldHVybiByJiZlPHIubGVuZ3RoPyJrZXlzIj09dD97dmFsdWU6ZSxkb25lOiExfToidmFsdWVzIj09dD97dmFsdWU6cltlXSxkb25lOiExfTp7dmFsdWU6W2UscltlXV0sZG9uZTohMX06KG4udGFyZ2V0PXZvaWQgMCx7dmFsdWU6dm9pZCAwLGRvbmU6ITB9KX0pLCJ2YWx1ZXMiKSxabz1Xby5sbj1Xby5BcnJheTtpZih6bygia2V5cyIpLHpvKCJ2YWx1ZXMiKSx6bygiZW50cmllcyIpLHFvJiYidmFsdWVzIiE9PVpvLm5hbWUpdHJ5eyRvKFpvLCJuYW1lIix7dmFsdWU6InZhbHVlcyJ9KX1jYXRjaChuKXt9dmFyIG51PSJ1bmRlZmluZWQiIT10eXBlb2YgQXJyYXlCdWZmZXImJiJ1bmRlZmluZWQiIT10eXBlb2YgRGF0YVZpZXcscnU9TnIuZXhwb3J0cyx0dT1mdW5jdGlvbihuLHIsdCl7Zm9yKHZhciBlIGluIHIpcnUobixlLHJbZV0sdCk7cmV0dXJuIG59LGV1PXosaXU9dC5UeXBlRXJyb3Isb3U9ZnVuY3Rpb24obixyKXtpZihldShyLG4pKXJldHVybiBuO3Rocm93IGl1KCJJbmNvcnJlY3QgaW52b2NhdGlvbiIpfSx1dT1DdCxmdT1ZdCxhdT10LlJhbmdlRXJyb3IsY3U9ZnVuY3Rpb24obil7aWYodm9pZCAwPT09bilyZXR1cm4gMDt2YXIgcj11dShuKSx0PWZ1KHIpO2lmKHIhPT10KXRocm93IGF1KCJXcm9uZyBsZW5ndGggb3IgaW5kZXgiKTtyZXR1cm4gdH0sc3U9dC5BcnJheSx2dT1NYXRoLmFicyxodT1NYXRoLnBvdyxsdT1NYXRoLmZsb29yLGR1PU1hdGgubG9nLHl1PXtkbjpmdW5jdGlvbihuLHIsdCl7dmFyIGUsaSxvLHU9c3UodCksZj04KnQtci0xLGE9KDE8PGYpLTEsYz1hPj4xLHM9MjM9PT1yP2h1KDIsLTI0KS1odSgyLC03Nyk6MCx2PTA+bnx8MD09PW4mJjA+MS9uPzE6MCxoPTA7Zm9yKChuPXZ1KG4pKSE9bnx8bj09PTEvMD8oaT1uIT1uPzE6MCxlPWEpOihlPWx1KGR1KG4pLy42OTMxNDcxODA1NTk5NDUzKSwxPm4qKG89aHUoMiwtZSkpJiYoZS0tLG8qPTIpLDI+KG4rPTE+ZStjP3MqaHUoMiwxLWMpOnMvbykqb3x8KGUrKyxvLz0yKSxhPmUrYz8xPmUrYz8oaT1uKmh1KDIsYy0xKSpodSgyLHIpLGU9MCk6KGk9KG4qby0xKSpodSgyLHIpLGUrPWMpOihpPTAsZT1hKSk7cj49ODspdVtoKytdPTI1NSZpLGkvPTI1NixyLT04O2ZvcihlPWU8PHJ8aSxmKz1yO2Y+MDspdVtoKytdPTI1NSZlLGUvPTI1NixmLT04O3JldHVybiB1Wy0taF18PTEyOCp2LHV9LHluOmZ1bmN0aW9uKG4scil7dmFyIHQsZT1uLmxlbmd0aCxpPTgqZS1yLTEsbz0oMTw8aSktMSx1PW8+PjEsZj1pLTcsYT1lLTEsYz1uW2EtLV0scz0xMjcmYztmb3IoYz4+PTc7Zj4wOylzPTI1NipzK25bYS0tXSxmLT04O2Zvcih0PXMmKDE8PC1mKS0xLHM+Pj0tZixmKz1yO2Y+MDspdD0yNTYqdCtuW2EtLV0sZi09ODtpZigwPT09cylzPTEtdTtlbHNle2lmKHM9PT1vKXJldHVybiB0P05hTjpjPy0xLzA6MS8wO3QrPWh1KDIscikscy09dX1yZXR1cm4oYz8tMToxKSp0Kmh1KDIscy1yKX19LHd1PU1uLGJ1PUR0LHB1PVd0LGd1PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj13dSh0aGlzKSx0PXB1KHIpLGU9YXJndW1lbnRzLmxlbmd0aCxpPWJ1KGU+MT9hcmd1bWVudHNbMV06dm9pZCAwLHQpLG89ZT4yP2FyZ3VtZW50c1syXTp2b2lkIDAsdT12b2lkIDA9PT1vP3Q6YnUobyx0KTt1Pmk7KXJbaSsrXT1uO3JldHVybiByfSxtdT1pcixBdT1tcixrdT15LFN1PWZ1bmN0aW9uKG4scix0KXt2YXIgZT1tdShyKTtlIGluIG4/QXUuZihuLGUsa3UoMCx0KSk6bltlXT10fSxqdT1EdCxPdT1XdCxFdT1TdSxUdT10LkFycmF5LFJ1PU1hdGgubWF4LFV1PWZ1bmN0aW9uKG4scix0KXtmb3IodmFyIGU9T3UobiksaT1qdShyLGUpLG89anUodm9pZCAwPT09dD9lOnQsZSksdT1UdShSdShvLWksMCkpLGY9MDtvPmk7aSsrLGYrKylFdSh1LGYsbltpXSk7cmV0dXJuIHUubGVuZ3RoPWYsdX0sTXU9dCxJdT1BLF91PW8seHU9bnUsTHU9a3QsUHU9RnIsQ3U9dHUsRnU9aSxOdT1vdSxCdT1DdCxEdT1ZdCxHdT1jdSxWdT15dSxZdT1aaSx6dT1PbyxXdT14dC5mLEh1PW1yLmYsJHU9Z3UsS3U9VXUscXU9dm8sSnU9THUuWixYdT1MdS5ubixRdT1idC5nZXQsWnU9YnQuc2V0LG5mPU11LkFycmF5QnVmZmVyLHJmPW5mLHRmPXJmJiZyZi5wcm90b3R5cGUsZWY9TXUuRGF0YVZpZXcsb2Y9ZWYmJmVmLnByb3RvdHlwZSx1Zj1PYmplY3QucHJvdG90eXBlLGZmPU11LkFycmF5LGFmPU11LlJhbmdlRXJyb3IsY2Y9SXUoJHUpLHNmPUl1KFtdLnJldmVyc2UpLHZmPVZ1LmRuLGhmPVZ1LnluLGxmPWZ1bmN0aW9uKG4pe3JldHVyblsyNTUmbl19LGRmPWZ1bmN0aW9uKG4pe3JldHVyblsyNTUmbixuPj44JjI1NV19LHlmPWZ1bmN0aW9uKG4pe3JldHVyblsyNTUmbixuPj44JjI1NSxuPj4xNiYyNTUsbj4+MjQmMjU1XX0sd2Y9ZnVuY3Rpb24obil7cmV0dXJuIG5bM108PDI0fG5bMl08PDE2fG5bMV08PDh8blswXX0sYmY9ZnVuY3Rpb24obil7cmV0dXJuIHZmKG4sMjMsNCl9LHBmPWZ1bmN0aW9uKG4pe3JldHVybiB2ZihuLDUyLDgpfSxnZj1mdW5jdGlvbihuLHIpe0h1KG4ucHJvdG90eXBlLHIse2dldDpmdW5jdGlvbigpe3JldHVybiBRdSh0aGlzKVtyXX19KX0sbWY9ZnVuY3Rpb24obixyLHQsZSl7dmFyIGk9R3UodCksbz1RdShuKTtpZihpK3I+by5ieXRlTGVuZ3RoKXRocm93IGFmKCJXcm9uZyBpbmRleCIpO3ZhciB1PVF1KG8uYnVmZmVyKS53bixmPWkrby5ieXRlT2Zmc2V0LGE9S3UodSxmLGYrcik7cmV0dXJuIGU/YTpzZihhKX0sQWY9ZnVuY3Rpb24obixyLHQsZSxpLG8pe3ZhciB1PUd1KHQpLGY9UXUobik7aWYodStyPmYuYnl0ZUxlbmd0aCl0aHJvdyBhZigiV3JvbmcgaW5kZXgiKTtmb3IodmFyIGE9UXUoZi5idWZmZXIpLnduLGM9dStmLmJ5dGVPZmZzZXQscz1lKCtpKSx2PTA7cj52O3YrKylhW2Mrdl09c1tvP3Y6ci12LTFdfTtpZih4dSl7dmFyIGtmPUp1JiYiQXJyYXlCdWZmZXIiIT09bmYubmFtZTtpZihGdSgoZnVuY3Rpb24oKXtuZigxKX0pKSYmRnUoKGZ1bmN0aW9uKCl7bmV3IG5mKC0xKX0pKSYmIUZ1KChmdW5jdGlvbigpe3JldHVybiBuZXcgbmYsbmV3IG5mKDEuNSksbmV3IG5mKE5hTiksa2YmJiFYdX0pKSlrZiYmWHUmJlB1KG5mLCJuYW1lIiwiQXJyYXlCdWZmZXIiKTtlbHNleyhyZj1mdW5jdGlvbihuKXtyZXR1cm4gTnUodGhpcyx0ZiksbmV3IG5mKEd1KG4pKX0pLnByb3RvdHlwZT10Zjtmb3IodmFyIFNmLGpmPVd1KG5mKSxPZj0wO2pmLmxlbmd0aD5PZjspKFNmPWpmW09mKytdKWluIHJmfHxQdShyZixTZixuZltTZl0pO3RmLmNvbnN0cnVjdG9yPXJmfXp1JiZZdShvZikhPT11ZiYmenUob2YsdWYpO3ZhciBFZj1uZXcgZWYobmV3IHJmKDIpKSxUZj1JdShvZi5zZXRJbnQ4KTtFZi5zZXRJbnQ4KDAsMjE0NzQ4MzY0OCksRWYuc2V0SW50OCgxLDIxNDc0ODM2NDkpLCFFZi5nZXRJbnQ4KDApJiZFZi5nZXRJbnQ4KDEpfHxDdShvZix7c2V0SW50ODpmdW5jdGlvbihuLHIpe1RmKHRoaXMsbixyPDwyND4+MjQpfSxzZXRVaW50ODpmdW5jdGlvbihuLHIpe1RmKHRoaXMsbixyPDwyND4+MjQpfX0se3JuOiEwfSl9ZWxzZSB0Zj0ocmY9ZnVuY3Rpb24obil7TnUodGhpcyx0Zik7dmFyIHI9R3Uobik7WnUodGhpcyx7d246Y2YoZmYociksMCksYnl0ZUxlbmd0aDpyfSksX3V8fCh0aGlzLmJ5dGVMZW5ndGg9cil9KS5wcm90b3R5cGUsb2Y9KGVmPWZ1bmN0aW9uKG4scix0KXtOdSh0aGlzLG9mKSxOdShuLHRmKTt2YXIgZT1RdShuKS5ieXRlTGVuZ3RoLGk9QnUocik7aWYoMD5pfHxpPmUpdGhyb3cgYWYoIldyb25nIG9mZnNldCIpO2lmKGkrKHQ9dm9pZCAwPT09dD9lLWk6RHUodCkpPmUpdGhyb3cgYWYoIldyb25nIGxlbmd0aCIpO1p1KHRoaXMse2J1ZmZlcjpuLGJ5dGVMZW5ndGg6dCxieXRlT2Zmc2V0Oml9KSxfdXx8KHRoaXMuYnVmZmVyPW4sdGhpcy5ieXRlTGVuZ3RoPXQsdGhpcy5ieXRlT2Zmc2V0PWkpfSkucHJvdG90eXBlLF91JiYoZ2YocmYsImJ5dGVMZW5ndGgiKSxnZihlZiwiYnVmZmVyIiksZ2YoZWYsImJ5dGVMZW5ndGgiKSxnZihlZiwiYnl0ZU9mZnNldCIpKSxDdShvZix7Z2V0SW50ODpmdW5jdGlvbihuKXtyZXR1cm4gbWYodGhpcywxLG4pWzBdPDwyND4+MjR9LGdldFVpbnQ4OmZ1bmN0aW9uKG4pe3JldHVybiBtZih0aGlzLDEsbilbMF19LGdldEludDE2OmZ1bmN0aW9uKG4pe3ZhciByPW1mKHRoaXMsMixuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKTtyZXR1cm4oclsxXTw8OHxyWzBdKTw8MTY+PjE2fSxnZXRVaW50MTY6ZnVuY3Rpb24obil7dmFyIHI9bWYodGhpcywyLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApO3JldHVybiByWzFdPDw4fHJbMF19LGdldEludDMyOmZ1bmN0aW9uKG4pe3JldHVybiB3ZihtZih0aGlzLDQsbixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCkpfSxnZXRVaW50MzI6ZnVuY3Rpb24obil7cmV0dXJuIHdmKG1mKHRoaXMsNCxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKSk+Pj4wfSxnZXRGbG9hdDMyOmZ1bmN0aW9uKG4pe3JldHVybiBoZihtZih0aGlzLDQsbixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCksMjMpfSxnZXRGbG9hdDY0OmZ1bmN0aW9uKG4pe3JldHVybiBoZihtZih0aGlzLDgsbixhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCksNTIpfSxzZXRJbnQ4OmZ1bmN0aW9uKG4scil7QWYodGhpcywxLG4sbGYscil9LHNldFVpbnQ4OmZ1bmN0aW9uKG4scil7QWYodGhpcywxLG4sbGYscil9LHNldEludDE2OmZ1bmN0aW9uKG4scil7QWYodGhpcywyLG4sZGYscixhcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCl9LHNldFVpbnQxNjpmdW5jdGlvbihuLHIpe0FmKHRoaXMsMixuLGRmLHIsYXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDApfSxzZXRJbnQzMjpmdW5jdGlvbihuLHIpe0FmKHRoaXMsNCxuLHlmLHIsYXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDApfSxzZXRVaW50MzI6ZnVuY3Rpb24obixyKXtBZih0aGlzLDQsbix5ZixyLGFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX0sc2V0RmxvYXQzMjpmdW5jdGlvbihuLHIpe0FmKHRoaXMsNCxuLGJmLHIsYXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDApfSxzZXRGbG9hdDY0OmZ1bmN0aW9uKG4scil7QWYodGhpcyw4LG4scGYscixhcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCl9fSk7cXUocmYsIkFycmF5QnVmZmVyIikscXUoZWYsIkRhdGFWaWV3Iik7dmFyIFJmPXtBcnJheUJ1ZmZlcjpyZixEYXRhVmlldzplZn0sVWY9QSxNZj1pLElmPUYsX2Y9V2UseGY9V3IsTGY9ZnVuY3Rpb24oKXt9LFBmPVtdLENmPVkoIlJlZmxlY3QiLCJjb25zdHJ1Y3QiKSxGZj0vXlxzKig/OmNsYXNzfGZ1bmN0aW9uKVxiLyxOZj1VZihGZi5leGVjKSxCZj0hRmYuZXhlYyhMZiksRGY9ZnVuY3Rpb24obil7aWYoIUlmKG4pKXJldHVybiExO3RyeXtyZXR1cm4gQ2YoTGYsUGYsbiksITB9Y2F0Y2gobil7cmV0dXJuITF9fSxHZj1mdW5jdGlvbihuKXtpZighSWYobikpcmV0dXJuITE7c3dpdGNoKF9mKG4pKXtjYXNlIkFzeW5jRnVuY3Rpb24iOmNhc2UiR2VuZXJhdG9yRnVuY3Rpb24iOmNhc2UiQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiI6cmV0dXJuITF9dHJ5e3JldHVybiBCZnx8ISFOZihGZix4ZihuKSl9Y2F0Y2gobil7cmV0dXJuITB9fTtHZi5HPSEwO3ZhciBWZj0hQ2Z8fE1mKChmdW5jdGlvbigpe3ZhciBuO3JldHVybiBEZihEZi5jYWxsKXx8IURmKE9iamVjdCl8fCFEZigoZnVuY3Rpb24oKXtuPSEwfSkpfHxufSkpP0dmOkRmLFlmPVZmLHpmPXNuLFdmPXQuVHlwZUVycm9yLEhmPWZ1bmN0aW9uKG4pe2lmKFlmKG4pKXJldHVybiBuO3Rocm93IFdmKHpmKG4pKyIgaXMgbm90IGEgY29uc3RydWN0b3IiKX0sJGY9RXIsS2Y9SGYscWY9cW4oInNwZWNpZXMiKSxKZj1mdW5jdGlvbihuLHIpe3ZhciB0LGU9JGYobikuY29uc3RydWN0b3I7cmV0dXJuIHZvaWQgMD09PWV8fG51bGw9PSh0PSRmKGUpW3FmXSk/cjpLZih0KX0sWGY9TGUsUWY9QSxaZj1pLG5hPUVyLHJhPUR0LHRhPVl0LGVhPUpmLGlhPVJmLkFycmF5QnVmZmVyLG9hPVJmLkRhdGFWaWV3LHVhPW9hLnByb3RvdHlwZSxmYT1RZihpYS5wcm90b3R5cGUuc2xpY2UpLGFhPVFmKHVhLmdldFVpbnQ4KSxjYT1RZih1YS5zZXRVaW50OCk7WGYoe3RhcmdldDoiQXJyYXlCdWZmZXIiLGNuOiEwLHJuOiEwLGZuOlpmKChmdW5jdGlvbigpe3JldHVybiFuZXcgaWEoMikuc2xpY2UoMSx2b2lkIDApLmJ5dGVMZW5ndGh9KSl9LHtzbGljZTpmdW5jdGlvbihuLHIpe2lmKGZhJiZ2b2lkIDA9PT1yKXJldHVybiBmYShuYSh0aGlzKSxuKTtmb3IodmFyIHQ9bmEodGhpcykuYnl0ZUxlbmd0aCxlPXJhKG4sdCksaT1yYSh2b2lkIDA9PT1yP3Q6cix0KSxvPW5ldyhlYSh0aGlzLGlhKSkodGEoaS1lKSksdT1uZXcgb2EodGhpcyksZj1uZXcgb2EobyksYT0wO2k+ZTspY2EoZixhKyssYWEodSxlKyspKTtyZXR1cm4gb319KTt2YXIgc2E9V2UsdmE9RmU/e30udG9TdHJpbmc6ZnVuY3Rpb24oKXtyZXR1cm4iW29iamVjdCAiK3NhKHRoaXMpKyJdIn0saGE9RmUsbGE9TnIuZXhwb3J0cztoYXx8bGEoT2JqZWN0LnByb3RvdHlwZSwidG9TdHJpbmciLHZhLHtybjohMH0pO3ZhciBkYT17ZXhwb3J0czp7fX0seWE9cW4oIml0ZXJhdG9yIiksd2E9ITE7dHJ5e3ZhciBiYT0wLHBhPXtuZXh0OmZ1bmN0aW9uKCl7cmV0dXJue2RvbmU6ISFiYSsrfX0sQTpmdW5jdGlvbigpe3dhPSEwfX07cGFbeWFdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LEFycmF5LmZyb20ocGEsKGZ1bmN0aW9uKCl7dGhyb3cgMn0pKX1jYXRjaChuKXt9dmFyIGdhLG1hLEFhLGthPWZ1bmN0aW9uKG4scil7aWYoIXImJiF3YSlyZXR1cm4hMTt2YXIgdD0hMTt0cnl7dmFyIGU9e307ZVt5YV09ZnVuY3Rpb24oKXtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybntkb25lOnQ9ITB9fX19LG4oZSl9Y2F0Y2gobil7fXJldHVybiB0fSxTYT1udSxqYT1vLE9hPXQsRWE9RixUYT1CLFJhPXhuLFVhPVdlLE1hPXNuLElhPUZyLF9hPU5yLmV4cG9ydHMseGE9bXIuZixMYT16LFBhPVppLENhPU9vLEZhPXFuLE5hPU5uLEJhPU9hLkludDhBcnJheSxEYT1CYSYmQmEucHJvdG90eXBlLEdhPU9hLlVpbnQ4Q2xhbXBlZEFycmF5LFZhPUdhJiZHYS5wcm90b3R5cGUsWWE9QmEmJlBhKEJhKSx6YT1EYSYmUGEoRGEpLFdhPU9iamVjdC5wcm90b3R5cGUsSGE9T2EuVHlwZUVycm9yLCRhPUZhKCJ0b1N0cmluZ1RhZyIpLEthPU5hKCJUWVBFRF9BUlJBWV9UQUciKSxxYT1OYSgiVFlQRURfQVJSQVlfQ09OU1RSVUNUT1IiKSxKYT1TYSYmISFDYSYmIk9wZXJhIiE9PVVhKE9hLm9wZXJhKSxYYT0hMSxRYT17SW50OEFycmF5OjEsVWludDhBcnJheToxLFVpbnQ4Q2xhbXBlZEFycmF5OjEsSW50MTZBcnJheToyLFVpbnQxNkFycmF5OjIsSW50MzJBcnJheTo0LFVpbnQzMkFycmF5OjQsRmxvYXQzMkFycmF5OjQsRmxvYXQ2NEFycmF5Ojh9LFphPXtCaWdJbnQ2NEFycmF5OjgsQmlnVWludDY0QXJyYXk6OH0sbmM9ZnVuY3Rpb24obil7aWYoIVRhKG4pKXJldHVybiExO3ZhciByPVVhKG4pO3JldHVybiBSYShRYSxyKXx8UmEoWmEscil9O2ZvcihnYSBpbiBRYSkoQWE9KG1hPU9hW2dhXSkmJm1hLnByb3RvdHlwZSk/SWEoQWEscWEsbWEpOkphPSExO2ZvcihnYSBpbiBaYSkoQWE9KG1hPU9hW2dhXSkmJm1hLnByb3RvdHlwZSkmJklhKEFhLHFhLG1hKTtpZigoIUphfHwhRWEoWWEpfHxZYT09PUZ1bmN0aW9uLnByb3RvdHlwZSkmJihZYT1mdW5jdGlvbigpe3Rocm93IEhhKCJJbmNvcnJlY3QgaW52b2NhdGlvbiIpfSxKYSkpZm9yKGdhIGluIFFhKU9hW2dhXSYmQ2EoT2FbZ2FdLFlhKTtpZigoIUphfHwhemF8fHphPT09V2EpJiYoemE9WWEucHJvdG90eXBlLEphKSlmb3IoZ2EgaW4gUWEpT2FbZ2FdJiZDYShPYVtnYV0ucHJvdG90eXBlLHphKTtpZihKYSYmUGEoVmEpIT09emEmJkNhKFZhLHphKSxqYSYmIVJhKHphLCRhKSlmb3IoZ2EgaW4gWGE9ITAseGEoemEsJGEse2dldDpmdW5jdGlvbigpe3JldHVybiBUYSh0aGlzKT90aGlzW0thXTp2b2lkIDB9fSksUWEpT2FbZ2FdJiZJYShPYVtnYV0sS2EsZ2EpO3ZhciByYz17Ym46SmEscG46cWEsZ246WGEmJkthLG1uOmZ1bmN0aW9uKG4pe2lmKG5jKG4pKXJldHVybiBuO3Rocm93IEhhKCJUYXJnZXQgaXMgbm90IGEgdHlwZWQgYXJyYXkiKX0sQW46ZnVuY3Rpb24obil7aWYoRWEobikmJighQ2F8fExhKFlhLG4pKSlyZXR1cm4gbjt0aHJvdyBIYShNYShuKSsiIGlzIG5vdCBhIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIil9LGtuOmZ1bmN0aW9uKG4scix0LGUpe2lmKGphKXtpZih0KWZvcih2YXIgaSBpbiBRYSl7dmFyIG89T2FbaV07aWYobyYmUmEoby5wcm90b3R5cGUsbikpdHJ5e2RlbGV0ZSBvLnByb3RvdHlwZVtuXX1jYXRjaCh0KXt0cnl7by5wcm90b3R5cGVbbl09cn1jYXRjaChuKXt9fX16YVtuXSYmIXR8fF9hKHphLG4sdD9yOkphJiZEYVtuXXx8cixlKX19LFNuOmZ1bmN0aW9uKG4scix0KXt2YXIgZSxpO2lmKGphKXtpZihDYSl7aWYodClmb3IoZSBpbiBRYSlpZigoaT1PYVtlXSkmJlJhKGksbikpdHJ5e2RlbGV0ZSBpW25dfWNhdGNoKG4pe31pZihZYVtuXSYmIXQpcmV0dXJuO3RyeXtyZXR1cm4gX2EoWWEsbix0P3I6SmEmJllhW25dfHxyKX1jYXRjaChuKXt9fWZvcihlIGluIFFhKSEoaT1PYVtlXSl8fGlbbl0mJiF0fHxfYShpLG4scil9fSxpc1ZpZXc6ZnVuY3Rpb24obil7aWYoIVRhKG4pKXJldHVybiExO3ZhciByPVVhKG4pO3JldHVybiJEYXRhVmlldyI9PT1yfHxSYShRYSxyKXx8UmEoWmEscil9LGpuOm5jLE9uOllhLEVuOnphfSx0Yz10LGVjPWksaWM9a2Esb2M9cmMuYm4sdWM9dGMuQXJyYXlCdWZmZXIsZmM9dGMuSW50OEFycmF5LGFjPSFvY3x8IWVjKChmdW5jdGlvbigpe2ZjKDEpfSkpfHwhZWMoKGZ1bmN0aW9uKCl7bmV3IGZjKC0xKX0pKXx8IWljKChmdW5jdGlvbihuKXtuZXcgZmMsbmV3IGZjKG51bGwpLG5ldyBmYygxLjUpLG5ldyBmYyhuKX0pLCEwKXx8ZWMoKGZ1bmN0aW9uKCl7cmV0dXJuIDEhPT1uZXcgZmMobmV3IHVjKDIpLDEsdm9pZCAwKS5sZW5ndGh9KSksY2M9QixzYz1NYXRoLmZsb29yLHZjPU51bWJlci5pc0ludGVnZXJ8fGZ1bmN0aW9uKG4pe3JldHVybiFjYyhuKSYmaXNGaW5pdGUobikmJnNjKG4pPT09bn0saGM9Q3QsbGM9dC5SYW5nZUVycm9yLGRjPXQuUmFuZ2VFcnJvcix5Yz1mdW5jdGlvbihuLHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3ZhciByPWhjKG4pO2lmKDA+cil0aHJvdyBsYygiVGhlIGFyZ3VtZW50IGNhbid0IGJlIGxlc3MgdGhhbiAwIik7cmV0dXJuIHJ9KG4pO2lmKHQlcil0aHJvdyBkYygiV3Jvbmcgb2Zmc2V0Iik7cmV0dXJuIHR9LHdjPWRuLGJjPXUscGM9QShBLmJpbmQpLGdjPWZ1bmN0aW9uKG4scil7cmV0dXJuIHdjKG4pLHZvaWQgMD09PXI/bjpiYz9wYyhuLHIpOmZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkocixhcmd1bWVudHMpfX0sbWM9V2UsQWM9d24sa2M9WWksU2M9cW4oIml0ZXJhdG9yIiksamM9ZnVuY3Rpb24obil7aWYobnVsbCE9bilyZXR1cm4gQWMobixTYyl8fEFjKG4sIkBAaXRlcmF0b3IiKXx8a2NbbWMobildfSxPYz1hLEVjPWRuLFRjPUVyLFJjPXNuLFVjPWpjLE1jPXQuVHlwZUVycm9yLEljPWZ1bmN0aW9uKG4scil7dmFyIHQ9Mj5hcmd1bWVudHMubGVuZ3RoP1VjKG4pOnI7aWYoRWModCkpcmV0dXJuIFRjKE9jKHQsbikpO3Rocm93IE1jKFJjKG4pKyIgaXMgbm90IGl0ZXJhYmxlIil9LF9jPVlpLHhjPXFuKCJpdGVyYXRvciIpLExjPUFycmF5LnByb3RvdHlwZSxQYz1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwIT09biYmKF9jLkFycmF5PT09bnx8TGNbeGNdPT09bil9LENjPWdjLEZjPWEsTmM9SGYsQmM9TW4sRGM9V3QsR2M9SWMsVmM9amMsWWM9UGMsemM9cmMuQW4sV2M9TyxIYz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbihuKXtyZXR1cm4iQXJyYXkiPT1XYyhuKX0sJGM9dCxLYz1IYyxxYz1WZixKYz1CLFhjPXFuKCJzcGVjaWVzIiksUWM9JGMuQXJyYXksWmM9ZnVuY3Rpb24obixyKXtyZXR1cm4gbmV3KGZ1bmN0aW9uKG4pe3ZhciByO3JldHVybiBLYyhuKSYmKHI9bi5jb25zdHJ1Y3RvciwocWMocikmJihyPT09UWN8fEtjKHIucHJvdG90eXBlKSl8fEpjKHIpJiZudWxsPT09KHI9cltYY10pKSYmKHI9dm9pZCAwKSksdm9pZCAwPT09cj9RYzpyfShuKSkoMD09PXI/MDpyKX0sbnM9Z2MscnM9SSx0cz1Nbixlcz1XdCxpcz1aYyxvcz1BKFtdLnB1c2gpLHVzPWZ1bmN0aW9uKG4pe3ZhciByPTE9PW4sdD0yPT1uLGU9Mz09bixpPTQ9PW4sbz02PT1uLHU9Nz09bixmPTU9PW58fG87cmV0dXJuIGZ1bmN0aW9uKGEsYyxzLHYpe2Zvcih2YXIgaCxsLGQ9dHMoYSkseT1ycyhkKSx3PW5zKGMscyksYj1lcyh5KSxwPTAsZz12fHxpcyxtPXI/ZyhhLGIpOnR8fHU/ZyhhLDApOnZvaWQgMDtiPnA7cCsrKWlmKChmfHxwIGluIHkpJiYobD13KGg9eVtwXSxwLGQpLG4pKWlmKHIpbVtwXT1sO2Vsc2UgaWYobClzd2l0Y2gobil7Y2FzZSAzOnJldHVybiEwO2Nhc2UgNTpyZXR1cm4gaDtjYXNlIDY6cmV0dXJuIHA7Y2FzZSAyOm9zKG0saCl9ZWxzZSBzd2l0Y2gobil7Y2FzZSA0OnJldHVybiExO2Nhc2UgNzpvcyhtLGgpfXJldHVybiBvPy0xOmV8fGk/aTptfX0sZnM9e2ZvckVhY2g6dXMoMCksbWFwOnVzKDEpLGZpbHRlcjp1cygyKSxzb21lOnVzKDMpLGV2ZXJ5OnVzKDQpLGZpbmQ6dXMoNSksZmluZEluZGV4OnVzKDYpLFRuOnVzKDcpfSxhcz1ZLGNzPW1yLHNzPW8sdnM9cW4oInNwZWNpZXMiKSxocz1mdW5jdGlvbihuKXt2YXIgcj1hcyhuKSx0PWNzLmY7c3MmJnImJiFyW3ZzXSYmdChyLHZzLHtpOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzfX0pfSxscz1GLGRzPUIseXM9T28sd3M9TGUsYnM9dCxwcz1hLGdzPW8sbXM9YWMsQXM9cmMsa3M9UmYsU3M9b3UsanM9eSxPcz1GcixFcz12YyxUcz1ZdCxScz1jdSxVcz15YyxNcz1pcixJcz14bixfcz1XZSx4cz1CLExzPWFuLFBzPUxpLENzPXosRnM9T28sTnM9eHQuZixCcz1mdW5jdGlvbihuKXt2YXIgcix0LGUsaSxvLHUsZj1OYyh0aGlzKSxhPUJjKG4pLGM9YXJndW1lbnRzLmxlbmd0aCxzPWM+MT9hcmd1bWVudHNbMV06dm9pZCAwLHY9dm9pZCAwIT09cyxoPVZjKGEpO2lmKGgmJiFZYyhoKSlmb3IodT0obz1HYyhhLGgpKS5uZXh0LGE9W107IShpPUZjKHUsbykpLmRvbmU7KWEucHVzaChpLnZhbHVlKTtmb3IodiYmYz4yJiYocz1DYyhzLGFyZ3VtZW50c1syXSkpLHQ9RGMoYSksZT1uZXcoemMoZikpKHQpLHI9MDt0PnI7cisrKWVbcl09dj9zKGFbcl0scik6YVtyXTtyZXR1cm4gZX0sRHM9ZnMuZm9yRWFjaCxHcz1ocyxWcz1tcixZcz1lLHpzPWJ0LmdldCxXcz1idC5zZXQsSHM9VnMuZiwkcz1Zcy5mLEtzPU1hdGgucm91bmQscXM9YnMuUmFuZ2VFcnJvcixKcz1rcy5BcnJheUJ1ZmZlcixYcz1Kcy5wcm90b3R5cGUsUXM9a3MuRGF0YVZpZXcsWnM9QXMuYm4sbnY9QXMucG4scnY9QXMuZ24sdHY9QXMuT24sZXY9QXMuRW4saXY9QXMuQW4sb3Y9QXMuam4sdXY9ZnVuY3Rpb24obixyKXtpdihuKTtmb3IodmFyIHQ9MCxlPXIubGVuZ3RoLGk9bmV3IG4oZSk7ZT50OylpW3RdPXJbdCsrXTtyZXR1cm4gaX0sZnY9ZnVuY3Rpb24obixyKXtIcyhuLHIse2dldDpmdW5jdGlvbigpe3JldHVybiB6cyh0aGlzKVtyXX19KX0sYXY9ZnVuY3Rpb24obil7dmFyIHI7cmV0dXJuIENzKFhzLG4pfHwiQXJyYXlCdWZmZXIiPT0ocj1fcyhuKSl8fCJTaGFyZWRBcnJheUJ1ZmZlciI9PXJ9LGN2PWZ1bmN0aW9uKG4scil7cmV0dXJuIG92KG4pJiYhTHMocikmJnIgaW4gbiYmRXMoK3IpJiZyPj0wfSxzdj1mdW5jdGlvbihuLHIpe3JldHVybiByPU1zKHIpLGN2KG4scik/anMoMixuW3JdKTokcyhuLHIpfSx2dj1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHI9TXMociksIShjdihuLHIpJiZ4cyh0KSYmSXModCwidmFsdWUiKSl8fElzKHQsImdldCIpfHxJcyh0LCJzZXQiKXx8dC5pfHxJcyh0LCJ3cml0YWJsZSIpJiYhdC53cml0YWJsZXx8SXModCwiZW51bWVyYWJsZSIpJiYhdC50P0hzKG4scix0KToobltyXT10LnZhbHVlLG4pfTtncz8oWnN8fChZcy5mPXN2LFZzLmY9dnYsZnYoZXYsImJ1ZmZlciIpLGZ2KGV2LCJieXRlT2Zmc2V0IiksZnYoZXYsImJ5dGVMZW5ndGgiKSxmdihldiwibGVuZ3RoIikpLHdzKHt0YXJnZXQ6Ik9iamVjdCIsdW46ITAsZm46IVpzfSx7Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOnN2LGRlZmluZVByb3BlcnR5OnZ2fSksZGEuZXhwb3J0cz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9bi5tYXRjaCgvXGQrJC8pWzBdLzgsaT1uKyh0PyJDbGFtcGVkIjoiIikrIkFycmF5IixvPSJnZXQiK24sdT0ic2V0IituLGY9YnNbaV0sYT1mLGM9YSYmYS5wcm90b3R5cGUscz17fSx2PWZ1bmN0aW9uKG4scil7SHMobixyLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24obixyKXt2YXIgdD16cyhuKTtyZXR1cm4gdC52aWV3W29dKHIqZSt0LmJ5dGVPZmZzZXQsITApfSh0aGlzLHIpfSxzZXQ6ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKG4scixpKXt2YXIgbz16cyhuKTt0JiYoaT0wPihpPUtzKGkpKT8wOmk+MjU1PzI1NToyNTUmaSksby52aWV3W3VdKHIqZStvLmJ5dGVPZmZzZXQsaSwhMCl9KHRoaXMscixuKX0sdDohMH0pfTtacz9tcyYmKGE9cigoZnVuY3Rpb24obixyLHQsaSl7cmV0dXJuIFNzKG4sYyksZnVuY3Rpb24obixyLHQpe3ZhciBlLGk7cmV0dXJuIHlzJiZscyhlPXIuY29uc3RydWN0b3IpJiZlIT09dCYmZHMoaT1lLnByb3RvdHlwZSkmJmkhPT10LnByb3RvdHlwZSYmeXMobixpKSxufSh4cyhyKT9hdihyKT92b2lkIDAhPT1pP25ldyBmKHIsVXModCxlKSxpKTp2b2lkIDAhPT10P25ldyBmKHIsVXModCxlKSk6bmV3IGYocik6b3Yocik/dXYoYSxyKTpwcyhCcyxhLHIpOm5ldyBmKFJzKHIpKSxuLGEpfSkpLEZzJiZGcyhhLHR2KSxEcyhOcyhmKSwoZnVuY3Rpb24obil7biBpbiBhfHxPcyhhLG4sZltuXSl9KSksYS5wcm90b3R5cGU9Yyk6KGE9cigoZnVuY3Rpb24obixyLHQsaSl7U3MobixjKTt2YXIgbyx1LGYscz0wLGg9MDtpZih4cyhyKSl7aWYoIWF2KHIpKXJldHVybiBvdihyKT91dihhLHIpOnBzKEJzLGEscik7bz1yLGg9VXModCxlKTt2YXIgbD1yLmJ5dGVMZW5ndGg7aWYodm9pZCAwPT09aSl7aWYobCVlKXRocm93IHFzKCJXcm9uZyBsZW5ndGgiKTtpZigwPih1PWwtaCkpdGhyb3cgcXMoIldyb25nIGxlbmd0aCIpfWVsc2UgaWYoKHU9VHMoaSkqZSkraD5sKXRocm93IHFzKCJXcm9uZyBsZW5ndGgiKTtmPXUvZX1lbHNlIGY9UnMociksbz1uZXcgSnModT1mKmUpO2ZvcihXcyhuLHtidWZmZXI6byxieXRlT2Zmc2V0OmgsYnl0ZUxlbmd0aDp1LGxlbmd0aDpmLHZpZXc6bmV3IFFzKG8pfSk7Zj5zOyl2KG4scysrKX0pKSxGcyYmRnMoYSx0diksYz1hLnByb3RvdHlwZT1QcyhldikpLGMuY29uc3RydWN0b3IhPT1hJiZPcyhjLCJjb25zdHJ1Y3RvciIsYSksT3MoYyxudixhKSxydiYmT3MoYyxydixpKSxzW2ldPWEsd3Moe2dsb2JhbDohMCxmbjphIT1mLEc6IVpzfSxzKSwiQllURVNfUEVSX0VMRU1FTlQiaW4gYXx8T3MoYSwiQllURVNfUEVSX0VMRU1FTlQiLGUpLCJCWVRFU19QRVJfRUxFTUVOVCJpbiBjfHxPcyhjLCJCWVRFU19QRVJfRUxFTUVOVCIsZSksR3MoaSl9KTpkYS5leHBvcnRzPWZ1bmN0aW9uKCl7fSwoMCxkYS5leHBvcnRzKSgiVWludDgiLChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24ocix0LGUpe3JldHVybiBuKHRoaXMscix0LGUpfX0pKTt2YXIgaHY9TW4sbHY9RHQsZHY9V3QseXY9TWF0aC5taW4sd3Y9cmMsYnY9QShbXS5jb3B5V2l0aGlufHxmdW5jdGlvbihuLHIpe3ZhciB0PWh2KHRoaXMpLGU9ZHYodCksaT1sdihuLGUpLG89bHYocixlKSx1PWFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwLGY9eXYoKHZvaWQgMD09PXU/ZTpsdih1LGUpKS1vLGUtaSksYT0xO2ZvcihpPm8mJm8rZj5pJiYoYT0tMSxvKz1mLTEsaSs9Zi0xKTtmLS0gPjA7KW8gaW4gdD90W2ldPXRbb106ZGVsZXRlIHRbaV0saSs9YSxvKz1hO3JldHVybiB0fSkscHY9d3YubW47KDAsd3Yua24pKCJjb3B5V2l0aGluIiwoZnVuY3Rpb24obixyKXtyZXR1cm4gYnYocHYodGhpcyksbixyLGFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX0pKTt2YXIgZ3Y9ZnMuZXZlcnksbXY9cmMubW47KDAscmMua24pKCJldmVyeSIsKGZ1bmN0aW9uKG4pe3JldHVybiBndihtdih0aGlzKSxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgQXY9YSxrdj1ndSxTdj1yYy5tbjsoMCxyYy5rbikoImZpbGwiLChmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBBdihrdixTdih0aGlzKSxuLHI+MT9hcmd1bWVudHNbMV06dm9pZCAwLHI+Mj9hcmd1bWVudHNbMl06dm9pZCAwKX0pKTt2YXIganY9V3QsT3Y9SmYsRXY9cmMucG4sVHY9cmMuQW4sUnY9ZnVuY3Rpb24obil7cmV0dXJuIFR2KE92KG4sbltFdl0pKX0sVXY9UnYsTXY9ZnMuZmlsdGVyLEl2PWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PTAsZT1qdihyKSxpPW5ldyBuKGUpO2U+dDspaVt0XT1yW3QrK107cmV0dXJuIGl9KFV2KG4pLHIpfSxfdj1yYy5tbjsoMCxyYy5rbikoImZpbHRlciIsKGZ1bmN0aW9uKG4pe3ZhciByPU12KF92KHRoaXMpLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApO3JldHVybiBJdih0aGlzLHIpfSkpO3ZhciB4dj1mcy5maW5kLEx2PXJjLm1uOygwLHJjLmtuKSgiZmluZCIsKGZ1bmN0aW9uKG4pe3JldHVybiB4dihMdih0aGlzKSxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgUHY9ZnMuZmluZEluZGV4LEN2PXJjLm1uOygwLHJjLmtuKSgiZmluZEluZGV4IiwoZnVuY3Rpb24obil7cmV0dXJuIFB2KEN2KHRoaXMpLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBGdj1mcy5mb3JFYWNoLE52PXJjLm1uOygwLHJjLmtuKSgiZm9yRWFjaCIsKGZ1bmN0aW9uKG4pe0Z2KE52KHRoaXMpLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBCdj1KdC5pbmNsdWRlcyxEdj1yYy5tbjsoMCxyYy5rbikoImluY2x1ZGVzIiwoZnVuY3Rpb24obil7cmV0dXJuIEJ2KER2KHRoaXMpLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBHdj1KdC5pbmRleE9mLFZ2PXJjLm1uOygwLHJjLmtuKSgiaW5kZXhPZiIsKGZ1bmN0aW9uKG4pe3JldHVybiBHdihWdih0aGlzKSxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgWXY9dCx6dj1pLFd2PUEsSHY9cmMsJHY9UW8sS3Y9cW4oIml0ZXJhdG9yIikscXY9WXYuVWludDhBcnJheSxKdj1Xdigkdi52YWx1ZXMpLFh2PVd2KCR2LmtleXMpLFF2PVd2KCR2LmVudHJpZXMpLFp2PUh2Lm1uLG5oPUh2LmtuLHJoPXF2JiZxdi5wcm90b3R5cGUsdGg9IXp2KChmdW5jdGlvbigpe3JoW0t2XS5jYWxsKFsxXSl9KSksZWg9ISFyaCYmcmgudmFsdWVzJiZyaFtLdl09PT1yaC52YWx1ZXMmJiJ2YWx1ZXMiPT09cmgudmFsdWVzLm5hbWUsaWg9ZnVuY3Rpb24oKXtyZXR1cm4gSnYoWnYodGhpcykpfTtuaCgiZW50cmllcyIsKGZ1bmN0aW9uKCl7cmV0dXJuIFF2KFp2KHRoaXMpKX0pLHRoKSxuaCgia2V5cyIsKGZ1bmN0aW9uKCl7cmV0dXJuIFh2KFp2KHRoaXMpKX0pLHRoKSxuaCgidmFsdWVzIixpaCx0aHx8IWVoLHtuYW1lOiJ2YWx1ZXMifSksbmgoS3YsaWgsdGh8fCFlaCx7bmFtZToidmFsdWVzIn0pO3ZhciBvaD1yYy5tbix1aD1yYy5rbixmaD1BKFtdLmpvaW4pO3VoKCJqb2luIiwoZnVuY3Rpb24obil7cmV0dXJuIGZoKG9oKHRoaXMpLG4pfSkpO3ZhciBhaCxjaD11LHNoPUZ1bmN0aW9uLnByb3RvdHlwZSx2aD1zaC5hcHBseSxoaD1zaC5jYWxsLGxoPSJvYmplY3QiPT10eXBlb2YgUmVmbGVjdCYmUmVmbGVjdC5hcHBseXx8KGNoP2hoLmJpbmQodmgpOmZ1bmN0aW9uKCl7cmV0dXJuIGhoLmFwcGx5KHZoLGFyZ3VtZW50cyl9KSxkaD1saCx5aD1DLHdoPUN0LGJoPVd0LHBoPU1hdGgubWluLGdoPVtdLmxhc3RJbmRleE9mLG1oPSEhZ2gmJiExLEFoPSEhKGFoPVtdLmxhc3RJbmRleE9mKSYmaSgoZnVuY3Rpb24oKXthaC5jYWxsKG51bGwsKGZ1bmN0aW9uKCl7cmV0dXJuIDF9KSwxKX0pKSxraD1saCxTaD1taHx8IUFoP2Z1bmN0aW9uKG4pe2lmKG1oKXJldHVybiBkaChnaCx0aGlzLGFyZ3VtZW50cyl8fDA7dmFyIHI9eWgodGhpcyksdD1iaChyKSxlPXQtMTtmb3IoYXJndW1lbnRzLmxlbmd0aD4xJiYoZT1waChlLHdoKGFyZ3VtZW50c1sxXSkpKSwwPmUmJihlPXQrZSk7ZT49MDtlLS0paWYoZSBpbiByJiZyW2VdPT09bilyZXR1cm4gZXx8MDtyZXR1cm4tMX06Z2gsamg9cmMubW47KDAscmMua24pKCJsYXN0SW5kZXhPZiIsKGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGtoKFNoLGpoKHRoaXMpLHI+MT9bbixhcmd1bWVudHNbMV1dOltuXSl9KSk7dmFyIE9oPWZzLm1hcCxFaD1SdixUaD1yYy5tbjsoMCxyYy5rbikoIm1hcCIsKGZ1bmN0aW9uKG4pe3JldHVybiBPaChUaCh0aGlzKSxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwLChmdW5jdGlvbihuLHIpe3JldHVybiBuZXcoRWgobikpKHIpfSkpfSkpO3ZhciBSaD1kbixVaD1NbixNaD1JLEloPVd0LF9oPXQuVHlwZUVycm9yLHhoPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihyLHQsZSxpKXtSaCh0KTt2YXIgbz1VaChyKSx1PU1oKG8pLGY9SWgobyksYT1uP2YtMTowLGM9bj8tMToxO2lmKDI+ZSlmb3IoOzspe2lmKGEgaW4gdSl7aT11W2FdLGErPWM7YnJlYWt9aWYoYSs9YyxuPzA+YTphPj1mKXRocm93IF9oKCJSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlIil9Zm9yKDtuP2E+PTA6Zj5hO2ErPWMpYSBpbiB1JiYoaT10KGksdVthXSxhLG8pKTtyZXR1cm4gaX19LExoPXtsZWZ0OnhoKCExKSxyaWdodDp4aCghMCl9LFBoPUxoLmxlZnQsQ2g9cmMubW47KDAscmMua24pKCJyZWR1Y2UiLChmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBQaChDaCh0aGlzKSxuLHIscj4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBGaD1MaC5yaWdodCxOaD1yYy5tbjsoMCxyYy5rbikoInJlZHVjZVJpZ2h0IiwoZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gRmgoTmgodGhpcyksbixyLHI+MT9hcmd1bWVudHNbMV06dm9pZCAwKX0pKTt2YXIgQmg9cmMubW4sRGg9TWF0aC5mbG9vcjsoMCxyYy5rbikoInJldmVyc2UiLChmdW5jdGlvbigpe2Zvcih2YXIgbixyPXRoaXMsdD1CaChyKS5sZW5ndGgsZT1EaCh0LzIpLGk9MDtlPmk7KW49cltpXSxyW2krK109clstLXRdLHJbdF09bjtyZXR1cm4gcn0pKTt2YXIgR2g9dCxWaD1hLFloPXJjLHpoPVd0LFdoPXljLEhoPU1uLCRoPWksS2g9R2guUmFuZ2VFcnJvcixxaD1HaC5JbnQ4QXJyYXksSmg9cWgmJnFoLnByb3RvdHlwZSxYaD1KaCYmSmguc2V0LFFoPVloLm1uLFpoPVloLmtuLG5sPSEkaCgoZnVuY3Rpb24oKXt2YXIgbj1uZXcgVWludDhDbGFtcGVkQXJyYXkoMik7cmV0dXJuIFZoKFhoLG4se2xlbmd0aDoxLDA6M30sMSksMyE9PW5bMV19KSkscmw9bmwmJlloLmJuJiYkaCgoZnVuY3Rpb24oKXt2YXIgbj1uZXcgcWgoMik7cmV0dXJuIG4uc2V0KDEpLG4uc2V0KCIyIiwxKSwwIT09blswXXx8MiE9PW5bMV19KSk7WmgoInNldCIsKGZ1bmN0aW9uKG4pe1FoKHRoaXMpO3ZhciByPVdoKGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwLDEpLHQ9SGgobik7aWYobmwpcmV0dXJuIFZoKFhoLHRoaXMsdCxyKTt2YXIgZT10aGlzLmxlbmd0aCxpPXpoKHQpLG89MDtpZihpK3I+ZSl0aHJvdyBLaCgiV3JvbmcgbGVuZ3RoIik7Zm9yKDtpPm87KXRoaXNbcitvXT10W28rK119KSwhbmx8fHJsKTt2YXIgdGw9QShbXS5zbGljZSksZWw9UnYsaWw9dGwsb2w9cmMubW47KDAscmMua24pKCJzbGljZSIsKGZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PWlsKG9sKHRoaXMpLG4sciksZT1lbCh0aGlzKSxpPTAsbz10Lmxlbmd0aCx1PW5ldyBlKG8pO28+aTspdVtpXT10W2krK107cmV0dXJuIHV9KSxpKChmdW5jdGlvbigpe25ldyBJbnQ4QXJyYXkoMSkuc2xpY2UoKX0pKSk7dmFyIHVsPWZzLnNvbWUsZmw9cmMubW47KDAscmMua24pKCJzb21lIiwoZnVuY3Rpb24obil7cmV0dXJuIHVsKGZsKHRoaXMpLG4sYXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDApfSkpO3ZhciBhbD1VdSxjbD1NYXRoLmZsb29yLHNsPWZ1bmN0aW9uKG4scil7dmFyIHQ9bi5sZW5ndGgsZT1jbCh0LzIpO3JldHVybiA4PnQ/dmwobixyKTpobChuLHNsKGFsKG4sMCxlKSxyKSxzbChhbChuLGUpLHIpLHIpfSx2bD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdCxlLGk9bi5sZW5ndGgsbz0xO2k+bzspe2ZvcihlPW8sdD1uW29dO2UmJnIobltlLTFdLHQpPjA7KW5bZV09blstLWVdO2UhPT1vKysmJihuW2VdPXQpfXJldHVybiBufSxobD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIGk9ci5sZW5ndGgsbz10Lmxlbmd0aCx1PTAsZj0wO2k+dXx8bz5mOyluW3UrZl09aT51JiZvPmY/ZShyW3VdLHRbZl0pPjA/dFtmKytdOnJbdSsrXTppPnU/clt1KytdOnRbZisrXTtyZXR1cm4gbn0sbGw9c2wsZGw9Vy5tYXRjaCgvZmlyZWZveFwvKFxkKykvaSkseWw9ISFkbCYmK2RsWzFdLHdsPS9NU0lFfFRyaWRlbnQvLnRlc3QoVyksYmw9Vy5tYXRjaCgvQXBwbGVXZWJLaXRcLyhcZCspXC4vKSxwbD0hIWJsJiYrYmxbMV0sZ2w9dCxtbD1BLEFsPWksa2w9ZG4sU2w9bGwsamw9cmMsT2w9eWwsRWw9d2wsVGw9USxSbD1wbCxVbD1nbC5BcnJheSxNbD1qbC5tbixJbD1qbC5rbixfbD1nbC5VaW50MTZBcnJheSx4bD1fbCYmbWwoX2wucHJvdG90eXBlLnNvcnQpLExsPSEoIXhsfHxBbCgoZnVuY3Rpb24oKXt4bChuZXcgX2woMiksbnVsbCl9KSkmJkFsKChmdW5jdGlvbigpe3hsKG5ldyBfbCgyKSx7fSl9KSkpLFBsPSEheGwmJiFBbCgoZnVuY3Rpb24oKXtpZihUbClyZXR1cm4gNzQ+VGw7aWYoT2wpcmV0dXJuIDY3Pk9sO2lmKEVsKXJldHVybiEwO2lmKFJsKXJldHVybiA2MDI+Umw7dmFyIG4scix0PW5ldyBfbCg1MTYpLGU9VWwoNTE2KTtmb3Iobj0wOzUxNj5uO24rKylyPW4lNCx0W25dPTUxNS1uLGVbbl09bi0yKnIrMztmb3IoeGwodCwoZnVuY3Rpb24obixyKXtyZXR1cm4obi80fDApLShyLzR8MCl9KSksbj0wOzUxNj5uO24rKylpZih0W25dIT09ZVtuXSlyZXR1cm4hMH0pKTtJbCgic29ydCIsKGZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDAhPT1uJiZrbChuKSxQbD94bCh0aGlzLG4pOlNsKE1sKHRoaXMpLGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihyLHQpe3JldHVybiB2b2lkIDAhPT1uPytuKHIsdCl8fDA6dCE9dD8tMTpyIT1yPzE6MD09PXImJjA9PT10PzEvcj4wJiYwPjEvdD8xOi0xOnI+dH19KG4pKX0pLCFQbHx8TGwpO3ZhciBDbD1ZdCxGbD1EdCxObD1SdixCbD1yYy5tbjsoMCxyYy5rbikoInN1YmFycmF5IiwoZnVuY3Rpb24obixyKXt2YXIgdD1CbCh0aGlzKSxlPXQubGVuZ3RoLGk9RmwobixlKTtyZXR1cm4gbmV3KE5sKHQpKSh0LmJ1ZmZlcix0LmJ5dGVPZmZzZXQraSp0LkJZVEVTX1BFUl9FTEVNRU5ULENsKCh2b2lkIDA9PT1yP2U6RmwocixlKSktaSkpfSkpO3ZhciBEbD1saCxHbD1yYyxWbD1pLFlsPXRsLHpsPXQuSW50OEFycmF5LFdsPUdsLm1uLEhsPUdsLmtuLCRsPVtdLnRvTG9jYWxlU3RyaW5nLEtsPSEhemwmJlZsKChmdW5jdGlvbigpeyRsLmNhbGwobmV3IHpsKDEpKX0pKTtIbCgidG9Mb2NhbGVTdHJpbmciLChmdW5jdGlvbigpe3JldHVybiBEbCgkbCxLbD9ZbChXbCh0aGlzKSk6V2wodGhpcyksWWwoYXJndW1lbnRzKSl9KSxWbCgoZnVuY3Rpb24oKXtyZXR1cm5bMSwyXS50b0xvY2FsZVN0cmluZygpIT1uZXcgemwoWzEsMl0pLnRvTG9jYWxlU3RyaW5nKCl9KSl8fCFWbCgoZnVuY3Rpb24oKXt6bC5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcuY2FsbChbMSwyXSl9KSkpO3ZhciBxbD1yYy5rbixKbD1pLFhsPUEsUWw9dC5VaW50OEFycmF5LFpsPVFsJiZRbC5wcm90b3R5cGV8fHt9LG5kPVtdLnRvU3RyaW5nLHJkPVhsKFtdLmpvaW4pO0psKChmdW5jdGlvbigpe25kLmNhbGwoe30pfSkpJiYobmQ9ZnVuY3Rpb24oKXtyZXR1cm4gcmQodGhpcyl9KTt2YXIgdGQ9WmwudG9TdHJpbmchPW5kO3FsKCJ0b1N0cmluZyIsbmQsdGQpO3ZhciBlZCxpZCxvZCx1ZCxmZD10LlByb21pc2UsYWQ9YSxjZD1FcixzZD13bix2ZD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsaTtjZChuKTt0cnl7aWYoIShlPXNkKG4sInJldHVybiIpKSl7aWYoInRocm93Ij09PXIpdGhyb3cgdDtyZXR1cm4gdH1lPWFkKGUsbil9Y2F0Y2gobil7aT0hMCxlPW59aWYoInRocm93Ij09PXIpdGhyb3cgdDtpZihpKXRocm93IGU7cmV0dXJuIGNkKGUpLHR9LGhkPWdjLGxkPWEsZGQ9RXIseWQ9c24sd2Q9UGMsYmQ9V3QscGQ9eixnZD1JYyxtZD1qYyxBZD12ZCxrZD10LlR5cGVFcnJvcixTZD1mdW5jdGlvbihuLHIpe3RoaXMuc3RvcHBlZD1uLHRoaXMucmVzdWx0PXJ9LGpkPVNkLnByb3RvdHlwZSxPZD10LlR5cGVFcnJvcixFZD0vKD86aXBhZHxpcGhvbmV8aXBvZCkuKmFwcGxld2Via2l0L2kudGVzdChXKSxUZD0icHJvY2VzcyI9PU8odC5wcm9jZXNzKSxSZD10LFVkPWxoLE1kPWdjLElkPUYsX2Q9eG4seGQ9aSxMZD1raSxQZD10bCxDZD1hcixGZD1mdW5jdGlvbihuLHIpe2lmKHI+bil0aHJvdyBPZCgiTm90IGVub3VnaCBhcmd1bWVudHMiKTtyZXR1cm4gbn0sTmQ9RWQsQmQ9VGQsRGQ9UmQuc2V0SW1tZWRpYXRlLEdkPVJkLmNsZWFySW1tZWRpYXRlLFZkPVJkLnByb2Nlc3MsWWQ9UmQuUm4semQ9UmQuRnVuY3Rpb24sV2Q9UmQuTWVzc2FnZUNoYW5uZWwsSGQ9UmQuU3RyaW5nLCRkPTAsS2Q9e307dHJ5e2VkPVJkLmxvY2F0aW9ufWNhdGNoKG4pe312YXIgcWQ9ZnVuY3Rpb24obil7aWYoX2QoS2Qsbikpe3ZhciByPUtkW25dO2RlbGV0ZSBLZFtuXSxyKCl9fSxKZD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtxZChuKX19LFhkPWZ1bmN0aW9uKG4pe3FkKG4uZGF0YSl9LFFkPWZ1bmN0aW9uKG4pe1JkLnBvc3RNZXNzYWdlKEhkKG4pLGVkLnByb3RvY29sKyIvLyIrZWQuaG9zdCl9O0RkJiZHZHx8KERkPWZ1bmN0aW9uKG4pe0ZkKGFyZ3VtZW50cy5sZW5ndGgsMSk7dmFyIHI9SWQobik/bjp6ZChuKSx0PVBkKGFyZ3VtZW50cywxKTtyZXR1cm4gS2RbKyskZF09ZnVuY3Rpb24oKXtVZChyLHZvaWQgMCx0KX0saWQoJGQpLCRkfSxHZD1mdW5jdGlvbihuKXtkZWxldGUgS2Rbbl19LEJkP2lkPWZ1bmN0aW9uKG4pe1ZkLlVuKEpkKG4pKX06WWQmJllkLm5vdz9pZD1mdW5jdGlvbihuKXtZZC5ub3coSmQobikpfTpXZCYmIU5kPyh1ZD0ob2Q9bmV3IFdkKS5wb3J0MixvZC5wb3J0MS5vbm1lc3NhZ2U9WGQsaWQ9TWQodWQucG9zdE1lc3NhZ2UsdWQpKTpSZC5hZGRFdmVudExpc3RlbmVyJiZJZChSZC5wb3N0TWVzc2FnZSkmJiFSZC5NbiYmZWQmJiJmaWxlOiIhPT1lZC5wcm90b2NvbCYmIXhkKFFkKT8oaWQ9UWQsUmQuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsWGQsITEpKTppZD0ib25yZWFkeXN0YXRlY2hhbmdlImluIENkKCJzY3JpcHQiKT9mdW5jdGlvbihuKXtMZC5hcHBlbmRDaGlsZChDZCgic2NyaXB0IikpLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe0xkLnJlbW92ZUNoaWxkKHRoaXMpLHFkKG4pfX06ZnVuY3Rpb24obil7c2V0VGltZW91dChKZChuKSwwKX0pO3ZhciBaZCxueSxyeSx0eSxleSxpeSxveSx1eSxmeT17c2V0OkRkLGNsZWFyOkdkfSxheT10LGN5PS9pcGFkfGlwaG9uZXxpcG9kL2kudGVzdChXKSYmdm9pZCAwIT09YXkuSW4sc3k9L3dlYjBzKD8hLipjaHJvbWUpL2kudGVzdChXKSx2eT10LGh5PWdjLGx5PWUuZixkeT1meS5zZXQseXk9RWQsd3k9Y3ksYnk9c3kscHk9VGQsZ3k9dnkuTXV0YXRpb25PYnNlcnZlcnx8dnkuV2ViS2l0TXV0YXRpb25PYnNlcnZlcixteT12eS5kb2N1bWVudCxBeT12eS5wcm9jZXNzLGt5PXZ5LlByb21pc2UsU3k9bHkodnksInF1ZXVlTWljcm90YXNrIiksank9U3kmJlN5LnZhbHVlO2p5fHwoWmQ9ZnVuY3Rpb24oKXt2YXIgbixyO2ZvcihweSYmKG49QXkuZG9tYWluKSYmbi5fbigpO255Oyl7cj1ueS54bixueT1ueS5uZXh0O3RyeXtyKCl9Y2F0Y2gobil7dGhyb3cgbnk/dHkoKTpyeT12b2lkIDAsbn19cnk9dm9pZCAwLG4mJm4uTG4oKX0seXl8fHB5fHxieXx8IWd5fHwhbXk/IXd5JiZreSYma3kucmVzb2x2ZT8oKG95PWt5LnJlc29sdmUodm9pZCAwKSkuY29uc3RydWN0b3I9a3ksdXk9aHkob3kudGhlbixveSksdHk9ZnVuY3Rpb24oKXt1eShaZCl9KTpweT90eT1mdW5jdGlvbigpe0F5LlVuKFpkKX06KGR5PWh5KGR5LHZ5KSx0eT1mdW5jdGlvbigpe2R5KFpkKX0pOihleT0hMCxpeT1teS5jcmVhdGVUZXh0Tm9kZSgiIiksbmV3IGd5KFpkKS5vYnNlcnZlKGl5LHtjaGFyYWN0ZXJEYXRhOiEwfSksdHk9ZnVuY3Rpb24oKXtpeS5kYXRhPWV5PSFleX0pKTt2YXIgT3k9anl8fGZ1bmN0aW9uKG4pe3ZhciByPXt4bjpuLG5leHQ6dm9pZCAwfTtyeSYmKHJ5Lm5leHQ9ciksbnl8fChueT1yLHR5KCkpLHJ5PXJ9LEV5PXt9LFR5PWRuLFJ5PWZ1bmN0aW9uKG4pe3ZhciByLHQ7dGhpcy5wcm9taXNlPW5ldyBuKChmdW5jdGlvbihuLGUpe2lmKHZvaWQgMCE9PXJ8fHZvaWQgMCE9PXQpdGhyb3cgVHlwZUVycm9yKCJCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvciIpO3I9bix0PWV9KSksdGhpcy5yZXNvbHZlPVR5KHIpLHRoaXMucmVqZWN0PVR5KHQpfTtFeS5mPWZ1bmN0aW9uKG4pe3JldHVybiBuZXcgUnkobil9O3ZhciBVeT1FcixNeT1CLEl5PUV5LF95PXQseHk9ZnVuY3Rpb24oKXt0aGlzLmhlYWQ9bnVsbCx0aGlzLlBuPW51bGx9O3h5LnByb3RvdHlwZT17YWRkOmZ1bmN0aW9uKG4pe3ZhciByPXtpdGVtOm4sbmV4dDpudWxsfTt0aGlzLmhlYWQ/dGhpcy5Qbi5uZXh0PXI6dGhpcy5oZWFkPXIsdGhpcy5Qbj1yfSxnZXQ6ZnVuY3Rpb24oKXt2YXIgbj10aGlzLmhlYWQ7aWYobilyZXR1cm4gdGhpcy5oZWFkPW4ubmV4dCx0aGlzLlBuPT09biYmKHRoaXMuUG49bnVsbCksbi5pdGVtfX07dmFyIEx5LFB5LEN5LEZ5LE55PXh5LEJ5PSJvYmplY3QiPT10eXBlb2Ygd2luZG93LER5PUxlLEd5PXQsVnk9WSxZeT1hLHp5PWZkLFd5PU5yLmV4cG9ydHMsSHk9dHUsJHk9T28sS3k9dm8scXk9aHMsSnk9ZG4sWHk9RixReT1CLFp5PW91LG53PVdyLHJ3PWZ1bmN0aW9uKG4scix0KXt2YXIgZSxpLG8sdSxmLGEsYyxzPXQmJnQuQ24sdj0hKCF0fHwhdC5GbiksaD0hKCF0fHwhdC5ObiksbD0hKCF0fHwhdC5CbiksZD1oZChyLHMpLHk9ZnVuY3Rpb24obil7cmV0dXJuIGUmJkFkKGUsIm5vcm1hbCIsbiksbmV3IFNkKCEwLG4pfSx3PWZ1bmN0aW9uKG4pe3JldHVybiB2PyhkZChuKSxsP2QoblswXSxuWzFdLHkpOmQoblswXSxuWzFdKSk6bD9kKG4seSk6ZChuKX07aWYoaCllPW47ZWxzZXtpZighKGk9bWQobikpKXRocm93IGtkKHlkKG4pKyIgaXMgbm90IGl0ZXJhYmxlIik7aWYod2QoaSkpe2ZvcihvPTAsdT1iZChuKTt1Pm87bysrKWlmKChmPXcobltvXSkpJiZwZChqZCxmKSlyZXR1cm4gZjtyZXR1cm4gbmV3IFNkKCExKX1lPWdkKG4saSl9Zm9yKGE9ZS5uZXh0OyEoYz1sZChhLGUpKS5kb25lOyl7dHJ5e2Y9dyhjLnZhbHVlKX1jYXRjaChuKXtBZChlLCJ0aHJvdyIsbil9aWYoIm9iamVjdCI9PXR5cGVvZiBmJiZmJiZwZChqZCxmKSlyZXR1cm4gZn1yZXR1cm4gbmV3IFNkKCExKX0sdHc9a2EsZXc9SmYsaXc9Znkuc2V0LG93PU95LHV3PUV5LGZ3PWZ1bmN0aW9uKG4pe3RyeXtyZXR1cm57ZXJyb3I6ITEsdmFsdWU6bigpfX1jYXRjaChuKXtyZXR1cm57ZXJyb3I6ITAsdmFsdWU6bn19fSxhdz1OeSxjdz1idCxzdz1FZSx2dz1CeSxodz1UZCxsdz1RLGR3PXFuKCJzcGVjaWVzIikseXc9IlByb21pc2UiLHd3PWN3LkooeXcpLGJ3PWN3LnNldCxwdz1jdy5KKHl3KSxndz16eSYmenkucHJvdG90eXBlLG13PXp5LEF3PWd3LGt3PUd5LlR5cGVFcnJvcixTdz1HeS5kb2N1bWVudCxqdz1HeS5wcm9jZXNzLE93PXV3LmYsRXc9T3csVHc9ISEoU3cmJlN3LmNyZWF0ZUV2ZW50JiZHeS5kaXNwYXRjaEV2ZW50KSxSdz1YeShHeS5Qcm9taXNlUmVqZWN0aW9uRXZlbnQpLFV3PSExLE13PXN3KHl3LChmdW5jdGlvbigpe3ZhciBuPW53KG13KSxyPW4hPT1tdysiIjtpZighciYmNjY9PT1sdylyZXR1cm4hMDtpZihsdz49NTEmJi9uYXRpdmUgY29kZS8udGVzdChuKSlyZXR1cm4hMTt2YXIgdD1uZXcgbXcoKGZ1bmN0aW9uKG4pe24oMSl9KSksZT1mdW5jdGlvbihuKXtuKChmdW5jdGlvbigpe30pLChmdW5jdGlvbigpe30pKX07cmV0dXJuKHQuY29uc3RydWN0b3I9e30pW2R3XT1lLCEoVXc9dC50aGVuKChmdW5jdGlvbigpe30pKWluc3RhbmNlb2YgZSl8fCFyJiZ2dyYmIVJ3fSkpLEl3PU13fHwhdHcoKGZ1bmN0aW9uKG4pe213LmFsbChuKS5jYXRjaCgoZnVuY3Rpb24oKXt9KSl9KSksX3c9ZnVuY3Rpb24obil7dmFyIHI7cmV0dXJuISghUXkobil8fCFYeShyPW4udGhlbikpJiZyfSx4dz1mdW5jdGlvbihuLHIpe3ZhciB0LGUsaSxvPXIudmFsdWUsdT0xPT1yLnN0YXRlLGY9dT9uLm9rOm4uRG4sYT1uLnJlc29sdmUsYz1uLnJlamVjdCxzPW4uZG9tYWluO3RyeXtmPyh1fHwoMj09PXIuR24mJk53KHIpLHIuR249MSksITA9PT1mP3Q9bzoocyYmcy5MbigpLHQ9ZihvKSxzJiYocy5fbigpLGk9ITApKSx0PT09bi5wcm9taXNlP2Moa3coIlByb21pc2UtY2hhaW4gY3ljbGUiKSk6KGU9X3codCkpP1l5KGUsdCxhLGMpOmEodCkpOmMobyl9Y2F0Y2gobil7cyYmIWkmJnMuX24oKSxjKG4pfX0sTHc9ZnVuY3Rpb24obixyKXtuLlZufHwobi5Wbj0hMCxvdygoZnVuY3Rpb24oKXtmb3IodmFyIHQsZT1uLlluO3Q9ZS5nZXQoKTspeHcodCxuKTtuLlZuPSExLHImJiFuLkduJiZDdyhuKX0pKSl9LFB3PWZ1bmN0aW9uKG4scix0KXt2YXIgZSxpO1R3PygoZT1Tdy5jcmVhdGVFdmVudCgiRXZlbnQiKSkucHJvbWlzZT1yLGUucmVhc29uPXQsZS5pbml0RXZlbnQobiwhMSwhMCksR3kuZGlzcGF0Y2hFdmVudChlKSk6ZT17cHJvbWlzZTpyLHJlYXNvbjp0fSwhUncmJihpPUd5WyJvbiIrbl0pP2koZSk6InVuaGFuZGxlZHJlamVjdGlvbiI9PT1uJiZmdW5jdGlvbihuLHIpe3ZhciB0PV95LmNvbnNvbGU7dCYmdC5lcnJvciYmKDE9PWFyZ3VtZW50cy5sZW5ndGg/dC5lcnJvcihuKTp0LmVycm9yKG4scikpfSgiVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uIix0KX0sQ3c9ZnVuY3Rpb24obil7WXkoaXcsR3ksKGZ1bmN0aW9uKCl7dmFyIHIsdD1uLkssZT1uLnZhbHVlO2lmKEZ3KG4pJiYocj1mdygoZnVuY3Rpb24oKXtodz9qdy56bigidW5oYW5kbGVkUmVqZWN0aW9uIixlLHQpOlB3KCJ1bmhhbmRsZWRyZWplY3Rpb24iLHQsZSl9KSksbi5Hbj1od3x8Rncobik/MjoxLHIuZXJyb3IpKXRocm93IHIudmFsdWV9KSl9LEZ3PWZ1bmN0aW9uKG4pe3JldHVybiAxIT09bi5HbiYmIW4ucGFyZW50fSxOdz1mdW5jdGlvbihuKXtZeShpdyxHeSwoZnVuY3Rpb24oKXt2YXIgcj1uLks7aHc/ancuem4oInJlamVjdGlvbkhhbmRsZWQiLHIpOlB3KCJyZWplY3Rpb25oYW5kbGVkIixyLG4udmFsdWUpfSkpfSxCdz1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGZ1bmN0aW9uKGUpe24ocixlLHQpfX0sRHc9ZnVuY3Rpb24obixyLHQpe24uZG9uZXx8KG4uZG9uZT0hMCx0JiYobj10KSxuLnZhbHVlPXIsbi5zdGF0ZT0yLEx3KG4sITApKX0sR3c9ZnVuY3Rpb24obixyLHQpe2lmKCFuLmRvbmUpe24uZG9uZT0hMCx0JiYobj10KTt0cnl7aWYobi5LPT09cil0aHJvdyBrdygiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGYiKTt2YXIgZT1fdyhyKTtlP293KChmdW5jdGlvbigpe3ZhciB0PXtkb25lOiExfTt0cnl7WXkoZSxyLEJ3KEd3LHQsbiksQncoRHcsdCxuKSl9Y2F0Y2gocil7RHcodCxyLG4pfX0pKToobi52YWx1ZT1yLG4uc3RhdGU9MSxMdyhuLCExKSl9Y2F0Y2gocil7RHcoe2RvbmU6ITF9LHIsbil9fX07aWYoTXcmJihBdz0obXc9ZnVuY3Rpb24obil7WnkodGhpcyxBdyksSnkobiksWXkoTHksdGhpcyk7dmFyIHI9d3codGhpcyk7dHJ5e24oQncoR3csciksQncoRHcscikpfWNhdGNoKG4pe0R3KHIsbil9fSkucHJvdG90eXBlLChMeT1mdW5jdGlvbigpe2J3KHRoaXMse3R5cGU6eXcsZG9uZTohMSxWbjohMSxwYXJlbnQ6ITEsWW46bmV3IGF3LEduOiExLHN0YXRlOjAsdmFsdWU6dm9pZCAwfSl9KS5wcm90b3R5cGU9SHkoQXcse3RoZW46ZnVuY3Rpb24obixyKXt2YXIgdD1wdyh0aGlzKSxlPU93KGV3KHRoaXMsbXcpKTtyZXR1cm4gdC5wYXJlbnQ9ITAsZS5vaz0hWHkobil8fG4sZS5Ebj1YeShyKSYmcixlLmRvbWFpbj1odz9qdy5kb21haW46dm9pZCAwLDA9PXQuc3RhdGU/dC5Zbi5hZGQoZSk6b3coKGZ1bmN0aW9uKCl7eHcoZSx0KX0pKSxlLnByb21pc2V9LGNhdGNoOmZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLnRoZW4odm9pZCAwLG4pfX0pLFB5PWZ1bmN0aW9uKCl7dmFyIG49bmV3IEx5LHI9d3cobik7dGhpcy5wcm9taXNlPW4sdGhpcy5yZXNvbHZlPUJ3KEd3LHIpLHRoaXMucmVqZWN0PUJ3KER3LHIpfSx1dy5mPU93PWZ1bmN0aW9uKG4pe3JldHVybiBuPT09bXd8fG49PT1DeT9uZXcgUHkobik6RXcobil9LFh5KHp5KSYmZ3chPT1PYmplY3QucHJvdG90eXBlKSl7Rnk9Z3cudGhlbixVd3x8KFd5KGd3LCJ0aGVuIiwoZnVuY3Rpb24obixyKXt2YXIgdD10aGlzO3JldHVybiBuZXcgbXcoKGZ1bmN0aW9uKG4scil7WXkoRnksdCxuLHIpfSkpLnRoZW4obixyKX0pLHtybjohMH0pLFd5KGd3LCJjYXRjaCIsQXcuY2F0Y2gse3JuOiEwfSkpO3RyeXtkZWxldGUgZ3cuY29uc3RydWN0b3J9Y2F0Y2gobil7fSR5JiYkeShndyxBdyl9RHkoe2dsb2JhbDohMCx3cmFwOiEwLGZuOk13fSx7UHJvbWlzZTptd30pLEt5KG13LHl3LCExKSxxeSh5dyksQ3k9VnkoeXcpLER5KHt0YXJnZXQ6eXcsdW46ITAsZm46TXd9LHtyZWplY3Q6ZnVuY3Rpb24obil7dmFyIHI9T3codGhpcyk7cmV0dXJuIFl5KHIucmVqZWN0LHZvaWQgMCxuKSxyLnByb21pc2V9fSksRHkoe3RhcmdldDp5dyx1bjohMCxmbjpNd30se3Jlc29sdmU6ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKG4scil7aWYoVXkobiksTXkocikmJnIuY29uc3RydWN0b3I9PT1uKXJldHVybiByO3ZhciB0PUl5LmYobik7cmV0dXJuKDAsdC5yZXNvbHZlKShyKSx0LnByb21pc2V9KHRoaXMsbil9fSksRHkoe3RhcmdldDp5dyx1bjohMCxmbjpJd30se2FsbDpmdW5jdGlvbihuKXt2YXIgcj10aGlzLHQ9T3cociksZT10LnJlc29sdmUsaT10LnJlamVjdCxvPWZ3KChmdW5jdGlvbigpe3ZhciB0PUp5KHIucmVzb2x2ZSksbz1bXSx1PTAsZj0xO3J3KG4sKGZ1bmN0aW9uKG4pe3ZhciBhPXUrKyxjPSExO2YrKyxZeSh0LHIsbikudGhlbigoZnVuY3Rpb24obil7Y3x8KGM9ITAsb1thXT1uLC0tZnx8ZShvKSl9KSxpKX0pKSwtLWZ8fGUobyl9KSk7cmV0dXJuIG8uZXJyb3ImJmkoby52YWx1ZSksdC5wcm9taXNlfSxyYWNlOmZ1bmN0aW9uKG4pe3ZhciByPXRoaXMsdD1PdyhyKSxlPXQucmVqZWN0LGk9ZncoKGZ1bmN0aW9uKCl7dmFyIGk9Snkoci5yZXNvbHZlKTtydyhuLChmdW5jdGlvbihuKXtZeShpLHIsbikudGhlbih0LnJlc29sdmUsZSl9KSl9KSk7cmV0dXJuIGkuZXJyb3ImJmUoaS52YWx1ZSksdC5wcm9taXNlfX0pO3ZhciBWdz1vLFl3PWEsenc9aSxXdz1kaSxIdz11ZSwkdz1jLEt3PU1uLHF3PUksSnc9T2JqZWN0LmFzc2lnbixYdz1PYmplY3QuZGVmaW5lUHJvcGVydHksUXc9QShbXS5jb25jYXQpLFp3PSFKd3x8encoKGZ1bmN0aW9uKCl7aWYoVncmJjEhPT1Kdyh7YjoxfSxKdyhYdyh7fSwiYSIse3Q6ITAsZ2V0OmZ1bmN0aW9uKCl7WHcodGhpcywiYiIse3ZhbHVlOjMsdDohMX0pfX0pLHtiOjJ9KSkuYilyZXR1cm4hMDt2YXIgbj17fSxyPXt9LHQ9U3ltYm9sKCksZT0iYWJjZGVmZ2hpamtsbW5vcHFyc3QiO3JldHVybiBuW3RdPTcsZS5zcGxpdCgiIikuZm9yRWFjaCgoZnVuY3Rpb24obil7cltuXT1ufSkpLDchPUp3KHt9LG4pW3RdfHxXdyhKdyh7fSxyKSkuam9pbigiIikhPWV9KSk/ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9S3cobiksZT1hcmd1bWVudHMubGVuZ3RoLGk9MSxvPUh3LmYsdT0kdy5mO2U+aTspZm9yKHZhciBmLGE9cXcoYXJndW1lbnRzW2krK10pLGM9bz9RdyhXdyhhKSxvKGEpKTpXdyhhKSxzPWMubGVuZ3RoLHY9MDtzPnY7KWY9Y1t2KytdLFZ3JiYhWXcodSxhLGYpfHwodFtmXT1hW2ZdKTtyZXR1cm4gdH06Snc7TGUoe3RhcmdldDoiT2JqZWN0Iix1bjohMCxmbjpPYmplY3QuYXNzaWduIT09Wnd9LHthc3NpZ246Wnd9KTtmb3IodmFyIG5iPVtdLHJiPTA7MjU2PnJiO3JiKyspe2Zvcih2YXIgdGI9cmIsZWI9MDs4PmViO2ViKyspMSZ0Yj90Yj10Yj4+PjFeMzk4ODI5MjM4NDp0Yj4+Pj0xO25iW3JiXT10Yn12YXIgaWI9ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKHIpeyFmdW5jdGlvbihuLHIpe2lmKCEobiBpbnN0YW5jZW9mIHIpKXRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpfSh0aGlzLG4pLHRoaXMuV249cnx8LTF9cmV0dXJuIGZ1bmN0aW9uKG4scil7ciYmZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKyl7dmFyIGU9clt0XTtlLnQ9ZS50fHwhMSxlLmk9ITAsInZhbHVlImluIGUmJihlLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobixlLmtleSxlKX19KG4ucHJvdG90eXBlLHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLCJwcm90b3R5cGUiLHt3cml0YWJsZTohMX0pfShuLFt7a2V5OiJhcHBlbmQiLHZhbHVlOmZ1bmN0aW9uKG4pe2Zvcih2YXIgcj0wfHRoaXMuV24sdD0wLGU9MHxuLmxlbmd0aDtlPnQ7dCsrKXI9cj4+PjhebmJbMjU1JihyXm5bdF0pXTt0aGlzLlduPXJ9fSx7a2V5OiJnZXQiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJufnRoaXMuV259fV0pLG59KCksb2I9YXIoInNwYW4iKS5jbGFzc0xpc3QsdWI9b2ImJm9iLmNvbnN0cnVjdG9yJiZvYi5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsZmI9dCxhYj17Q1NTUnVsZUxpc3Q6MCxDU1NTdHlsZURlY2xhcmF0aW9uOjAsQ1NTVmFsdWVMaXN0OjAsQ2xpZW50UmVjdExpc3Q6MCxET01SZWN0TGlzdDowLERPTVN0cmluZ0xpc3Q6MCxET01Ub2tlbkxpc3Q6MSxEYXRhVHJhbnNmZXJJdGVtTGlzdDowLEZpbGVMaXN0OjAsSFRNTEFsbENvbGxlY3Rpb246MCxIVE1MQ29sbGVjdGlvbjowLEhUTUxGb3JtRWxlbWVudDowLEhUTUxTZWxlY3RFbGVtZW50OjAsTWVkaWFMaXN0OjAsTWltZVR5cGVBcnJheTowLE5hbWVkTm9kZU1hcDowLE5vZGVMaXN0OjEsUGFpbnRSZXF1ZXN0TGlzdDowLFBsdWdpbjowLFBsdWdpbkFycmF5OjAsU1ZHTGVuZ3RoTGlzdDowLFNWR051bWJlckxpc3Q6MCxTVkdQYXRoU2VnTGlzdDowLFNWR1BvaW50TGlzdDowLFNWR1N0cmluZ0xpc3Q6MCxTVkdUcmFuc2Zvcm1MaXN0OjAsU291cmNlQnVmZmVyTGlzdDowLFN0eWxlU2hlZXRMaXN0OjAsVGV4dFRyYWNrQ3VlTGlzdDowLFRleHRUcmFja0xpc3Q6MCxUb3VjaExpc3Q6MH0sY2I9dWI9PT1PYmplY3QucHJvdG90eXBlP3ZvaWQgMDp1YixzYj1Rbyx2Yj1GcixoYj1xbixsYj1oYigiaXRlcmF0b3IiKSxkYj1oYigidG9TdHJpbmdUYWciKSx5Yj1zYi52YWx1ZXMsd2I9ZnVuY3Rpb24obixyKXtpZihuKXtpZihuW2xiXSE9PXliKXRyeXt2YihuLGxiLHliKX1jYXRjaChyKXtuW2xiXT15Yn1pZihuW2RiXXx8dmIobixkYixyKSxhYltyXSlmb3IodmFyIHQgaW4gc2IpaWYoblt0XSE9PXNiW3RdKXRyeXt2YihuLHQsc2JbdF0pfWNhdGNoKHIpe25bdF09c2JbdF19fX07Zm9yKHZhciBiYiBpbiBhYil3YihmYltiYl0mJmZiW2JiXS5wcm90b3R5cGUsYmIpO3diKGNiLCJET01Ub2tlbkxpc3QiKTt2YXIgcGI9RXIsZ2I9dmQsbWI9Z2MsQWI9YSxrYj1NbixTYj1mdW5jdGlvbihuLHIsdCxlKXt0cnl7cmV0dXJuIGU/cihwYih0KVswXSx0WzFdKTpyKHQpfWNhdGNoKHIpe2diKG4sInRocm93IixyKX19LGpiPVBjLE9iPVZmLEViPVd0LFRiPVN1LFJiPUljLFViPWpjLE1iPXQuQXJyYXk7TGUoe3RhcmdldDoiQXJyYXkiLHVuOiEwLGZuOiFrYSgoZnVuY3Rpb24obil7QXJyYXkuZnJvbShuKX0pKX0se2Zyb206ZnVuY3Rpb24obil7dmFyIHI9a2IobiksdD1PYih0aGlzKSxlPWFyZ3VtZW50cy5sZW5ndGgsaT1lPjE/YXJndW1lbnRzWzFdOnZvaWQgMCxvPXZvaWQgMCE9PWk7byYmKGk9bWIoaSxlPjI/YXJndW1lbnRzWzJdOnZvaWQgMCkpO3ZhciB1LGYsYSxjLHMsdixoPVViKHIpLGw9MDtpZighaHx8dGhpcz09TWImJmpiKGgpKWZvcih1PUViKHIpLGY9dD9uZXcgdGhpcyh1KTpNYih1KTt1Pmw7bCsrKXY9bz9pKHJbbF0sbCk6cltsXSxUYihmLGwsdik7ZWxzZSBmb3Iocz0oYz1SYihyLGgpKS5uZXh0LGY9dD9uZXcgdGhpczpbXTshKGE9QWIocyxjKSkuZG9uZTtsKyspdj1vP1NiKGMsaSxbYS52YWx1ZSxsXSwhMCk6YS52YWx1ZSxUYihmLGwsdik7cmV0dXJuIGYubGVuZ3RoPWwsZn19KTt2YXIgSWI9QSxfYj1DdCx4Yj1LZSxMYj14LFBiPUliKCIiLmNoYXJBdCksQ2I9SWIoIiIuY2hhckNvZGVBdCksRmI9SWIoIiIuc2xpY2UpLE5iPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihyLHQpe3ZhciBlLGksbz14YihMYihyKSksdT1fYih0KSxmPW8ubGVuZ3RoO3JldHVybiAwPnV8fHU+PWY/bj8iIjp2b2lkIDA6NTUyOTY+KGU9Q2Iobyx1KSl8fGU+NTYzMTl8fHUrMT09PWZ8fDU2MzIwPihpPUNiKG8sdSsxKSl8fGk+NTczNDM/bj9QYihvLHUpOmU6bj9GYihvLHUsdSsyKTppLTU2MzIwKyhlLTU1Mjk2PDwxMCkrNjU1MzZ9fSxCYj0oTmIoITEpLE5iKCEwKSksRGI9S2UsR2I9YnQsVmI9Vm8sWWI9R2Iuc2V0LHpiPUdiLkooIlN0cmluZyBJdGVyYXRvciIpO2Z1bmN0aW9uIFdiKG4pe2lmKCJ1bmRlZmluZWQiPT10eXBlb2YgVGV4dEVuY29kZXIpe249dW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KG4pKTtmb3IodmFyIHI9bmV3IFVpbnQ4QXJyYXkobi5sZW5ndGgpLHQ9MDt0PHIubGVuZ3RoO3QrKylyW3RdPW4uY2hhckNvZGVBdCh0KTtyZXR1cm4gcn1yZXR1cm4obmV3IFRleHRFbmNvZGVyKS5lbmNvZGUobil9VmIoU3RyaW5nLCJTdHJpbmciLChmdW5jdGlvbihuKXtZYih0aGlzLHt0eXBlOiJTdHJpbmcgSXRlcmF0b3IiLHN0cmluZzpEYihuKSxpbmRleDowfSl9KSwoZnVuY3Rpb24oKXt2YXIgbixyPXpiKHRoaXMpLHQ9ci5zdHJpbmcsZT1yLmluZGV4O3JldHVybiBlPHQubGVuZ3RoPyhuPUJiKHQsZSksci5pbmRleCs9bi5sZW5ndGgse3ZhbHVlOm4sZG9uZTohMX0pOnt2YWx1ZTp2b2lkIDAsZG9uZTohMH19KSk7dmFyIEhiPWksJGI9USxLYj1xbigic3BlY2llcyIpLHFiPWZ1bmN0aW9uKG4pe3JldHVybiAkYj49NTF8fCFIYigoZnVuY3Rpb24oKXt2YXIgcj1bXTtyZXR1cm4oci5jb25zdHJ1Y3Rvcj17fSlbS2JdPWZ1bmN0aW9uKCl7cmV0dXJue0huOjF9fSwxIT09cltuXShCb29sZWFuKS5Ibn0pKX0sSmI9TGUsWGI9dCxRYj1pLFpiPUhjLG5wPUIscnA9TW4sdHA9V3QsZXA9U3UsaXA9WmMsb3A9cWIsdXA9USxmcD1xbigiaXNDb25jYXRTcHJlYWRhYmxlIiksYXA9WGIuVHlwZUVycm9yLGNwPXVwPj01MXx8IVFiKChmdW5jdGlvbigpe3ZhciBuPVtdO3JldHVybiBuW2ZwXT0hMSxuLmNvbmNhdCgpWzBdIT09bn0pKSxzcD1vcCgiY29uY2F0IiksdnA9ZnVuY3Rpb24obil7aWYoIW5wKG4pKXJldHVybiExO3ZhciByPW5bZnBdO3JldHVybiB2b2lkIDAhPT1yPyEhcjpaYihuKX07SmIoe3RhcmdldDoiQXJyYXkiLGNuOiEwLGZuOiFjcHx8IXNwfSx7Y29uY2F0OmZ1bmN0aW9uKG4pe3ZhciByLHQsZSxpLG8sdT1ycCh0aGlzKSxmPWlwKHUsMCksYT0wO2ZvcihyPS0xLGU9YXJndW1lbnRzLmxlbmd0aDtlPnI7cisrKWlmKHZwKG89LTE9PT1yP3U6YXJndW1lbnRzW3JdKSl7aWYoYSsoaT10cChvKSk+OTAwNzE5OTI1NDc0MDk5MSl0aHJvdyBhcCgiTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkIik7Zm9yKHQ9MDtpPnQ7dCsrLGErKyl0IGluIG8mJmVwKGYsYSxvW3RdKX1lbHNle2lmKGE+PTkwMDcxOTkyNTQ3NDA5OTEpdGhyb3cgYXAoIk1heGltdW0gYWxsb3dlZCBpbmRleCBleGNlZWRlZCIpO2VwKGYsYSsrLG8pfXJldHVybiBmLmxlbmd0aD1hLGZ9fSk7dmFyIGhwPUxlLGxwPXQsZHA9SGMseXA9VmYsd3A9QixicD1EdCxwcD1XdCxncD1DLG1wPVN1LEFwPXFuLGtwPXRsLFNwPXFiKCJzbGljZSIpLGpwPUFwKCJzcGVjaWVzIiksT3A9bHAuQXJyYXksRXA9TWF0aC5tYXg7aHAoe3RhcmdldDoiQXJyYXkiLGNuOiEwLGZuOiFTcH0se3NsaWNlOmZ1bmN0aW9uKG4scil7dmFyIHQsZSxpLG89Z3AodGhpcyksdT1wcChvKSxmPWJwKG4sdSksYT1icCh2b2lkIDA9PT1yP3U6cix1KTtpZihkcChvKSYmKHQ9by5jb25zdHJ1Y3RvciwoeXAodCkmJih0PT09T3B8fGRwKHQucHJvdG90eXBlKSl8fHdwKHQpJiZudWxsPT09KHQ9dFtqcF0pKSYmKHQ9dm9pZCAwKSx0PT09T3B8fHZvaWQgMD09PXQpKXJldHVybiBrcChvLGYsYSk7Zm9yKGU9bmV3KHZvaWQgMD09PXQ/T3A6dCkoRXAoYS1mLDApKSxpPTA7YT5mO2YrKyxpKyspZiBpbiBvJiZtcChlLGksb1tmXSk7cmV0dXJuIGUubGVuZ3RoPWksZX19KSwoMCxkYS5leHBvcnRzKSgiVWludDMyIiwoZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHIsdCxlKXtyZXR1cm4gbih0aGlzLHIsdCxlKX19KSk7dmFyIFRwPUxlLFJwPXQsVXA9RHQsTXA9Q3QsSXA9V3QsX3A9TW4seHA9WmMsTHA9U3UsUHA9cWIoInNwbGljZSIpLENwPVJwLlR5cGVFcnJvcixGcD1NYXRoLm1heCxOcD1NYXRoLm1pbjtmdW5jdGlvbiBCcChuLHIpe2lmKCEobiBpbnN0YW5jZW9mIHIpKXRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpfWZ1bmN0aW9uIERwKG4scil7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe3ZhciBlPXJbdF07ZS50PWUudHx8ITEsZS5pPSEwLCJ2YWx1ZSJpbiBlJiYoZS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sZS5rZXksZSl9fWZ1bmN0aW9uIEdwKG4scix0KXtyZXR1cm4gciYmRHAobi5wcm90b3R5cGUsciksdCYmRHAobix0KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobiwicHJvdG90eXBlIix7d3JpdGFibGU6ITF9KSxufVRwKHt0YXJnZXQ6IkFycmF5IixjbjohMCxmbjohUHB9LHtzcGxpY2U6ZnVuY3Rpb24obixyKXt2YXIgdCxlLGksbyx1LGYsYT1fcCh0aGlzKSxjPUlwKGEpLHM9VXAobixjKSx2PWFyZ3VtZW50cy5sZW5ndGg7aWYoMD09PXY/dD1lPTA6MT09PXY/KHQ9MCxlPWMtcyk6KHQ9di0yLGU9TnAoRnAoTXAociksMCksYy1zKSksYyt0LWU+OTAwNzE5OTI1NDc0MDk5MSl0aHJvdyBDcCgiTWF4aW11bSBhbGxvd2VkIGxlbmd0aCBleGNlZWRlZCIpO2ZvcihpPXhwKGEsZSksbz0wO2U+bztvKyspKHU9cytvKWluIGEmJkxwKGksbyxhW3VdKTtpZihpLmxlbmd0aD1lLGU+dCl7Zm9yKG89cztjLWU+bztvKyspZj1vK3QsKHU9bytlKWluIGE/YVtmXT1hW3VdOmRlbGV0ZSBhW2ZdO2ZvcihvPWM7bz5jLWUrdDtvLS0pZGVsZXRlIGFbby0xXX1lbHNlIGlmKHQ+ZSlmb3Iobz1jLWU7bz5zO28tLSlmPW8rdC0xLCh1PW8rZS0xKWluIGE/YVtmXT1hW3VdOmRlbGV0ZSBhW2ZdO2ZvcihvPTA7dD5vO28rKylhW28rc109YXJndW1lbnRzW28rMl07cmV0dXJuIGEubGVuZ3RoPWMtZSt0LGl9fSk7dmFyIFZwPXtjb25jYXQ6ZnVuY3Rpb24obixyKXtpZigwPT09bi5sZW5ndGh8fDA9PT1yLmxlbmd0aClyZXR1cm4gbi5jb25jYXQocik7dmFyIHQ9bltuLmxlbmd0aC0xXSxlPVZwLiRuKHQpO3JldHVybiAzMj09PWU/bi5jb25jYXQocik6VnAuS24ocixlLDB8dCxuLnNsaWNlKDAsbi5sZW5ndGgtMSkpfSxxbjpmdW5jdGlvbihuKXt2YXIgcj1uLmxlbmd0aDtpZigwPT09cilyZXR1cm4gMDt2YXIgdD1uW3ItMV07cmV0dXJuIDMyKihyLTEpK1ZwLiRuKHQpfSxKbjpmdW5jdGlvbihuLHIpe2lmKDMyKm4ubGVuZ3RoPHIpcmV0dXJuIG47dmFyIHQ9KG49bi5zbGljZSgwLE1hdGguY2VpbChyLzMyKSkpLmxlbmd0aDtyZXR1cm4gciY9MzEsdD4wJiZyJiYoblt0LTFdPVZwLlhuKHIsblt0LTFdJjIxNDc0ODM2NDg+PnItMSwxKSksbn0sWG46ZnVuY3Rpb24obixyLHQpe3JldHVybiAzMj09PW4/cjoodD8wfHI6cjw8MzItbikrMTA5OTUxMTYyNzc3NipufSwkbjpmdW5jdGlvbihuKXtyZXR1cm4gTWF0aC5yb3VuZChuLzEwOTk1MTE2Mjc3NzYpfHwzMn0sS246ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZvaWQgMD09PWUmJihlPVtdKTtyPj0zMjtyLT0zMillLnB1c2godCksdD0wO2lmKDA9PT1yKXJldHVybiBlLmNvbmNhdChuKTtmb3IodmFyIGk9MDtpPG4ubGVuZ3RoO2krKyllLnB1c2godHxuW2ldPj4+ciksdD1uW2ldPDwzMi1yO3ZhciBvPW4ubGVuZ3RoP25bbi5sZW5ndGgtMV06MCx1PVZwLiRuKG8pO3JldHVybiBlLnB1c2goVnAuWG4ocit1JjMxLHIrdT4zMj90OmUucG9wKCksMSkpLGV9fSxZcD17d246e1FuOmZ1bmN0aW9uKG4pe2Zvcih2YXIgcix0PVZwLnFuKG4pLzgsZT1uZXcgVWludDhBcnJheSh0KSxpPTA7dD5pO2krKykwPT0oMyZpKSYmKHI9bltpLzRdKSxlW2ldPXI+Pj4yNCxyPDw9ODtyZXR1cm4gZX0sWm46ZnVuY3Rpb24obil7dmFyIHIsdD1bXSxlPTA7Zm9yKHI9MDtyPG4ubGVuZ3RoO3IrKyllPWU8PDh8bltyXSwzPT0oMyZyKSYmKHQucHVzaChlKSxlPTApO3JldHVybiAzJnImJnQucHVzaChWcC5Ybig4KigzJnIpLGUpKSx0fX19LHpwPXtucjpmdW5jdGlvbihuKXtuPyh0aGlzLnJyPW4ucnIuc2xpY2UoMCksdGhpcy50cj1uLnRyLnNsaWNlKDApLHRoaXMuZXI9bi5lcik6dGhpcy5yZXNldCgpfX07enAubnIucHJvdG90eXBlPXtibG9ja1NpemU6NTEyLHJlc2V0OmZ1bmN0aW9uKCl7dmFyIG49dGhpcztyZXR1cm4gbi5ycj10aGlzLmlyLnNsaWNlKDApLG4udHI9W10sbi5lcj0wLG59LHVwZGF0ZTpmdW5jdGlvbihuKXt2YXIgcj10aGlzOyJzdHJpbmciPT10eXBlb2YgbiYmKG49WXAudXIuWm4obikpO3ZhciB0PXIudHI9VnAuY29uY2F0KHIudHIsbiksZT1yLmVyLGk9ci5lcj1lK1ZwLnFuKG4pO2lmKGk+OTAwNzE5OTI1NDc0MDk5MSl0aHJvdyBFcnJvcigiQ2Fubm90IGhhc2ggbW9yZSB0aGFuIDJeNTMgLSAxIGJpdHMiKTtmb3IodmFyIG89bmV3IFVpbnQzMkFycmF5KHQpLHU9MCxmPXIuYmxvY2tTaXplK2UtKHIuYmxvY2tTaXplK2Umci5ibG9ja1NpemUtMSk7aT49ZjtmKz1yLmJsb2NrU2l6ZSlyLmFyKG8uc3ViYXJyYXkoMTYqdSwxNioodSsxKSkpLHUrPTE7cmV0dXJuIHQuc3BsaWNlKDAsMTYqdSkscn0sY3I6ZnVuY3Rpb24oKXtmb3IodmFyIG49dGhpcyxyPW4udHIsdD1uLnJyLGU9KHI9VnAuY29uY2F0KHIsW1ZwLlhuKDEsMSldKSkubGVuZ3RoKzI7MTUmZTtlKyspci5wdXNoKDApO2ZvcihyLnB1c2goTWF0aC5mbG9vcihuLmVyLzQyOTQ5NjcyOTYpKSxyLnB1c2goMHxuLmVyKTtyLmxlbmd0aDspbi5hcihyLnNwbGljZSgwLDE2KSk7cmV0dXJuIG4ucmVzZXQoKSx0fSxpcjpbMTczMjU4NDE5Myw0MDIzMjMzNDE3LDI1NjIzODMxMDIsMjcxNzMzODc4LDMyODUzNzc1MjBdLHNyOlsxNTE4NTAwMjQ5LDE4NTk3NzUzOTMsMjQwMDk1OTcwOCwzMzk1NDY5NzgyXSx2cjpmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gbj4xOT9uPjM5P24+NTk/bj43OT92b2lkIDA6cl50XmU6ciZ0fHImZXx0JmU6cl50XmU6ciZ0fH5yJmV9LGhyOmZ1bmN0aW9uKG4scil7cmV0dXJuIHI8PG58cj4+PjMyLW59LGFyOmZ1bmN0aW9uKG4pe2Zvcih2YXIgcj10aGlzLHQ9ci5ycixlPUFycmF5KDgwKSxpPTA7MTY+aTtpKyspZVtpXT1uW2ldO2Zvcih2YXIgbz10WzBdLHU9dFsxXSxmPXRbMl0sYT10WzNdLGM9dFs0XSxzPTA7Nzk+PXM7cysrKXsxNj5zfHwoZVtzXT1yLmhyKDEsZVtzLTNdXmVbcy04XV5lW3MtMTRdXmVbcy0xNl0pKTt2YXIgdj1yLmhyKDUsbykrci52cihzLHUsZixhKStjK2Vbc10rci5zcltNYXRoLmZsb29yKHMvMjApXXwwO2M9YSxhPWYsZj1yLmhyKDMwLHUpLHU9byxvPXZ9dFswXT10WzBdK298MCx0WzFdPXRbMV0rdXwwLHRbMl09dFsyXStmfDAsdFszXT10WzNdK2F8MCx0WzRdPXRbNF0rY3wwfX07dmFyIFdwPXt9O1dwLmxyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyKXtCcCh0aGlzLG4pO3ZhciB0PXRoaXM7dC5kcj1bW1tdLFtdLFtdLFtdLFtdXSxbW10sW10sW10sW10sW11dXSx0LmRyWzBdWzBdWzBdfHx0LnlyKCk7dmFyIGUsaSxvLHU9dC5kclswXVs0XSxmPXQuZHJbMV0sYT1yLmxlbmd0aCxjPTE7aWYoNCE9PWEmJjYhPT1hJiY4IT09YSl0aHJvdyBFcnJvcigiaW52YWxpZCBhZXMga2V5IHNpemUiKTtmb3IodC5zcj1baT1yLnNsaWNlKDApLG89W11dLGU9YTs0KmErMjg+ZTtlKyspe3ZhciBzPWlbZS0xXTsoZSVhPT0wfHw4PT09YSYmZSVhPT00KSYmKHM9dVtzPj4+MjRdPDwyNF51W3M+PjE2JjI1NV08PDE2XnVbcz4+OCYyNTVdPDw4XnVbMjU1JnNdLGUlYT09MCYmKHM9czw8OF5zPj4+MjReYzw8MjQsYz1jPDwxXjI4MyooYz4+NykpKSxpW2VdPWlbZS1hXV5zfWZvcih2YXIgdj0wO2U7disrLGUtLSl7dmFyIGg9aVszJnY/ZTplLTRdO29bdl09ND49ZXx8ND52P2g6ZlswXVt1W2g+Pj4yNF1dXmZbMV1bdVtoPj4xNiYyNTVdXV5mWzJdW3VbaD4+OCYyNTVdXV5mWzNdW3VbMjU1JmhdXX19cmV0dXJuIEdwKG4sW3trZXk6ImVuY3J5cHQiLHZhbHVlOmZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLndyKG4sMCl9fSx7a2V5OiJkZWNyeXB0Iix2YWx1ZTpmdW5jdGlvbihuKXtyZXR1cm4gdGhpcy53cihuLDEpfX0se2tleToiX3ByZWNvbXB1dGUiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBuLHIsdCxlPXRoaXMuZHJbMF0saT10aGlzLmRyWzFdLG89ZVs0XSx1PWlbNF0sZj1bXSxhPVtdLGM9MDsyNTY+YztjKyspYVsoZltjXT1jPDwxXjI4MyooYz4+NykpXmNdPWM7Zm9yKHZhciBzPW49MDshb1tzXTtzXj1yfHwxLG49YVtuXXx8MSl7dmFyIHY9bl5uPDwxXm48PDJebjw8M15uPDw0O3Y9dj4+OF4yNTUmdl45OSxvW3NdPXYsdVt2XT1zO2Zvcih2YXIgaD0xNjg0MzAwOSpmW3Q9ZltyPWZbc11dXV42NTUzNyp0XjI1NypyXjE2ODQzMDA4KnMsbD0yNTcqZlt2XV4xNjg0MzAwOCp2LGQ9MDs0PmQ7ZCsrKWVbZF1bc109bD1sPDwyNF5sPj4+OCxpW2RdW3ZdPWg9aDw8MjReaD4+Pjh9Zm9yKHZhciB5PTA7NT55O3krKyllW3ldPWVbeV0uc2xpY2UoMCksaVt5XT1pW3ldLnNsaWNlKDApfX0se2tleToiX2NyeXB0Iix2YWx1ZTpmdW5jdGlvbihuLHIpe2lmKDQhPT1uLmxlbmd0aCl0aHJvdyBFcnJvcigiaW52YWxpZCBhZXMgYmxvY2sgc2l6ZSIpO2Zvcih2YXIgdCxlLGksbz10aGlzLnNyW3JdLHU9by5sZW5ndGgvNC0yLGY9WzAsMCwwLDBdLGE9dGhpcy5kcltyXSxjPWFbMF0scz1hWzFdLHY9YVsyXSxoPWFbM10sbD1hWzRdLGQ9blswXV5vWzBdLHk9bltyPzM6MV1eb1sxXSx3PW5bMl1eb1syXSxiPW5bcj8xOjNdXm9bM10scD00LGc9MDt1Pmc7ZysrKXQ9Y1tkPj4+MjRdXnNbeT4+MTYmMjU1XV52W3c+PjgmMjU1XV5oWzI1NSZiXV5vW3BdLGU9Y1t5Pj4+MjRdXnNbdz4+MTYmMjU1XV52W2I+PjgmMjU1XV5oWzI1NSZkXV5vW3ArMV0saT1jW3c+Pj4yNF1ec1tiPj4xNiYyNTVdXnZbZD4+OCYyNTVdXmhbMjU1JnldXm9bcCsyXSxiPWNbYj4+PjI0XV5zW2Q+PjE2JjI1NV1edlt5Pj44JjI1NV1eaFsyNTUmd11eb1twKzNdLHArPTQsZD10LHk9ZSx3PWk7Zm9yKHZhciBtPTA7ND5tO20rKylmW3I/MyYtbTptXT1sW2Q+Pj4yNF08PDI0XmxbeT4+MTYmMjU1XTw8MTZebFt3Pj44JjI1NV08PDhebFsyNTUmYl1eb1twKytdLHQ9ZCxkPXkseT13LHc9YixiPXQ7cmV0dXJuIGZ9fV0pLG59KCk7dmFyIEhwPXt9O0hwLmJyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyLHQpe0JwKHRoaXMsbiksdGhpcy5wcj1yLHRoaXMuZ3I9dCx0aGlzLm1yPXR9cmV0dXJuIEdwKG4sW3trZXk6InJlc2V0Iix2YWx1ZTpmdW5jdGlvbigpe3RoaXMubXI9dGhpcy5ncn19LHtrZXk6InVwZGF0ZSIsdmFsdWU6ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMuQXIodGhpcy5wcixuLHRoaXMubXIpfX0se2tleToiaW5jV29yZCIsdmFsdWU6ZnVuY3Rpb24obil7aWYoMjU1PT0obj4+MjQmMjU1KSl7dmFyIHI9bj4+MTYmMjU1LHQ9bj4+OCYyNTUsZT0yNTUmbjsyNTU9PT1yPyhyPTAsMjU1PT09dD8odD0wLDI1NT09PWU/ZT0wOisrZSk6Kyt0KTorK3Isbj0wLG4rPXI8PDE2LG4rPXQ8PDgsbis9ZX1lbHNlIG4rPTE8PDI0O3JldHVybiBufX0se2tleToiaW5jQ291bnRlciIsdmFsdWU6ZnVuY3Rpb24obil7MD09PShuWzBdPXRoaXMua3IoblswXSkpJiYoblsxXT10aGlzLmtyKG5bMV0pKX19LHtrZXk6ImNhbGN1bGF0ZSIsdmFsdWU6ZnVuY3Rpb24obixyLHQpe3ZhciBlO2lmKCEoZT1yLmxlbmd0aCkpcmV0dXJuW107Zm9yKHZhciBpPVZwLnFuKHIpLG89MDtlPm87bys9NCl7dGhpcy5Tcih0KTt2YXIgdT1uLmVuY3J5cHQodCk7cltvXV49dVswXSxyW28rMV1ePXVbMV0scltvKzJdXj11WzJdLHJbbyszXV49dVszXX1yZXR1cm4gVnAuSm4ocixpKX19XSksbn0oKTt2YXIgJHA9e307ZnVuY3Rpb24gS3AobixyLHQsZSxpLG8sdSl7dHJ5e3ZhciBmPW5bb10odSksYT1mLnZhbHVlfWNhdGNoKG4pe3JldHVybiB2b2lkIHQobil9Zi5kb25lP3IoYSk6UHJvbWlzZS5yZXNvbHZlKGEpLnRoZW4oZSxpKX1mdW5jdGlvbiBxcChuKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgcj10aGlzLHQ9YXJndW1lbnRzO3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24oZSxpKXt2YXIgbz1uLmFwcGx5KHIsdCk7ZnVuY3Rpb24gdShuKXtLcChvLGUsaSx1LGYsIm5leHQiLG4pfWZ1bmN0aW9uIGYobil7S3AobyxlLGksdSxmLCJ0aHJvdyIsbil9dSh2b2lkIDApfSkpfX1mdW5jdGlvbiBKcChuLHIpe2lmKCEobiBpbnN0YW5jZW9mIHIpKXRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpfWZ1bmN0aW9uIFhwKG4scil7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe3ZhciBlPXJbdF07ZS50PWUudHx8ITEsZS5pPSEwLCJ2YWx1ZSJpbiBlJiYoZS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sZS5rZXksZSl9fWZ1bmN0aW9uIFFwKG4scix0KXtyZXR1cm4gciYmWHAobi5wcm90b3R5cGUsciksdCYmWHAobix0KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobiwicHJvdG90eXBlIix7d3JpdGFibGU6ITF9KSxufSRwLmpyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyKXtCcCh0aGlzLG4pO3ZhciB0PXRoaXMsZT10Lk9yPXpwLm5yLGk9W1tdLFtdXSxvPWUucHJvdG90eXBlLmJsb2NrU2l6ZS8zMjt0LkVyPVtuZXcgZSxuZXcgZV0sci5sZW5ndGg+byYmKHI9ZS5oYXNoKHIpKTtmb3IodmFyIHU9MDtvPnU7dSsrKWlbMF1bdV09OTA5NTIyNDg2XnJbdV0saVsxXVt1XT0xNTQ5NTU2ODI4XnJbdV07dC5FclswXS51cGRhdGUoaVswXSksdC5FclsxXS51cGRhdGUoaVsxXSksdC5Ucj1uZXcgZSh0LkVyWzBdKX1yZXR1cm4gR3Aobixbe2tleToicmVzZXQiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49dGhpcztuLlRyPW5ldyBuLk9yKG4uRXJbMF0pLG4uUnI9ITF9fSx7a2V5OiJ1cGRhdGUiLHZhbHVlOmZ1bmN0aW9uKG4pe3RoaXMuUnI9ITAsdGhpcy5Uci51cGRhdGUobil9fSx7a2V5OiJkaWdlc3QiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49dGhpcyxyPW4uVHIuY3IoKSx0PW5ldyBuLk9yKG4uRXJbMV0pLnVwZGF0ZShyKS5jcigpO3JldHVybiBuLnJlc2V0KCksdH19XSksbn0oKTt2YXIgWnA9e25hbWU6IlBCS0RGMiJ9LG5nPU9iamVjdC5hc3NpZ24oe2hhc2g6e25hbWU6IkhNQUMifX0sWnApLHJnPU9iamVjdC5hc3NpZ24oe2l0ZXJhdGlvbnM6MWUzLGhhc2g6e25hbWU6IlNIQS0xIn19LFpwKSx0Zz1bImRlcml2ZUJpdHMiXSxlZz1bOCwxMiwxNl0saWc9WzE2LDI0LDMyXSxvZz1bMCwwLDAsMF0sdWc9WXAud24sZmc9V3AubHIsYWc9SHAuYnIsY2c9JHAuanIsc2c9ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKHIsdCxlKXtKcCh0aGlzLG4pLE9iamVjdC5hc3NpZ24odGhpcyx7cGFzc3dvcmQ6cixzaWduZWQ6dCxVcjplLTEsTXI6bmV3IFVpbnQ4QXJyYXkoMCl9KX12YXIgcjtyZXR1cm4gUXAobixbe2tleToiYXBwZW5kIix2YWx1ZToocj1xcChyZWdlbmVyYXRvclJ1bnRpbWUubWFyaygoZnVuY3Rpb24gbihyKXt2YXIgdCxlLGk7cmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKChmdW5jdGlvbihuKXtmb3IoOzspc3dpdGNoKG4uUD1uLm5leHQpe2Nhc2UgMDppZighKHQ9dGhpcykucGFzc3dvcmQpe24ubmV4dD05O2JyZWFrfXJldHVybiBlPW1nKHIsMCxlZ1t0LlVyXSsyKSxuLm5leHQ9NSxsZyh0LGUsdC5wYXNzd29yZCk7Y2FzZSA1OnQucGFzc3dvcmQ9bnVsbCx0LklyPW5ldyBhZyhuZXcgZmcodC5rZXlzLmtleSksQXJyYXkuZnJvbShvZykpLHQuX3I9bmV3IGNnKHQua2V5cy5Mcikscj1tZyhyLGVnW3QuVXJdKzIpO2Nhc2UgOTpyZXR1cm4gaT1uZXcgVWludDhBcnJheShyLmxlbmd0aC0xMC0oci5sZW5ndGgtMTApJTE2KSxuLmcoInJldHVybiIsaGcodCxyLGksMCwxMCwhMCkpO2Nhc2UgMTE6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuLHRoaXMpfSkpKSxmdW5jdGlvbihuKXtyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX0se2tleToiZmx1c2giLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49dGhpcyxyPW4uTXIsdD1tZyhyLDAsci5sZW5ndGgtMTApLGU9bWcocixyLmxlbmd0aC0xMCksaT1uZXcgVWludDhBcnJheSgwKTtpZih0Lmxlbmd0aCl7dmFyIG89dWcuWm4odCk7bi5fci51cGRhdGUobyk7dmFyIHU9bi5Jci51cGRhdGUobyk7aT11Zy5Rbih1KX12YXIgZj0hMDtpZihuLnNpZ25lZClmb3IodmFyIGE9bWcodWcuUW4obi5fci5kaWdlc3QoKSksMCwxMCksYz0wOzEwPmM7YysrKWFbY10hPWVbY10mJihmPSExKTtyZXR1cm57dmFsaWQ6ZixkYXRhOml9fX1dKSxufSgpLHZnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyLHQpe0pwKHRoaXMsbiksT2JqZWN0LmFzc2lnbih0aGlzLHtwYXNzd29yZDpyLFVyOnQtMSxNcjpuZXcgVWludDhBcnJheSgwKX0pfXZhciByO3JldHVybiBRcChuLFt7a2V5OiJhcHBlbmQiLHZhbHVlOihyPXFwKHJlZ2VuZXJhdG9yUnVudGltZS5tYXJrKChmdW5jdGlvbiBuKHIpe3ZhciB0LGUsaTtyZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoKGZ1bmN0aW9uKG4pe2Zvcig7Oylzd2l0Y2gobi5QPW4ubmV4dCl7Y2FzZSAwOmlmKHQ9dGhpcyxlPW5ldyBVaW50OEFycmF5KDApLCF0LnBhc3N3b3JkKXtuLm5leHQ9OTticmVha31yZXR1cm4gbi5uZXh0PTUseWcodCx0LnBhc3N3b3JkKTtjYXNlIDU6ZT1uLmgsdC5wYXNzd29yZD1udWxsLHQuSXI9bmV3IGFnKG5ldyBmZyh0LmtleXMua2V5KSxBcnJheS5mcm9tKG9nKSksdC5fcj1uZXcgY2codC5rZXlzLkxyKTtjYXNlIDk6cmV0dXJuKGk9bmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgrci5sZW5ndGgtci5sZW5ndGglMTYpKS5zZXQoZSwwKSxuLmcoInJldHVybiIsaGcodCxyLGksZS5sZW5ndGgsMCkpO2Nhc2UgMTI6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuLHRoaXMpfSkpKSxmdW5jdGlvbihuKXtyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX0se2tleToiZmx1c2giLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49dGhpcyxyPW5ldyBVaW50OEFycmF5KDApO2lmKG4uTXIubGVuZ3RoKXt2YXIgdD1uLklyLnVwZGF0ZSh1Zy5abihuLk1yKSk7bi5fci51cGRhdGUodCkscj11Zy5Rbih0KX12YXIgZT1tZyh1Zy5RbihuLl9yLmRpZ2VzdCgpKSwwLDEwKTtyZXR1cm57ZGF0YTpnZyhyLGUpLHNpZ25hdHVyZTplfX19XSksbn0oKTtmdW5jdGlvbiBoZyhuLHIsdCxlLGksbyl7dmFyIHUsZj1yLmxlbmd0aC1pO2ZvcihuLk1yLmxlbmd0aCYmKHI9Z2cobi5NcixyKSx0PWZ1bmN0aW9uKG4scil7aWYociYmcj5uLmxlbmd0aCl7dmFyIHQ9bjsobj1uZXcgVWludDhBcnJheShyKSkuc2V0KHQsMCl9cmV0dXJuIG59KHQsZi1mJTE2KSksdT0wO2YtMTY+PXU7dSs9MTYpe3ZhciBhPXVnLlpuKG1nKHIsdSx1KzE2KSk7byYmbi5fci51cGRhdGUoYSk7dmFyIGM9bi5Jci51cGRhdGUoYSk7b3x8bi5fci51cGRhdGUoYyksdC5zZXQodWcuUW4oYyksdStlKX1yZXR1cm4gbi5Ncj1tZyhyLHUpLHR9ZnVuY3Rpb24gbGcobixyLHQpe3JldHVybiBkZy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gZGcoKXtyZXR1cm4gZGc9cXAocmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoKGZ1bmN0aW9uIG4ocix0LGUpe3ZhciBpLG87cmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKChmdW5jdGlvbihuKXtmb3IoOzspc3dpdGNoKG4uUD1uLm5leHQpe2Nhc2UgMDpyZXR1cm4gbi5uZXh0PTIsYmcocixlLG1nKHQsMCxlZ1tyLlVyXSkpO2Nhc2UgMjppZihpPW1nKHQsZWdbci5Vcl0pLChvPXIua2V5cy5wYXNzd29yZFZlcmlmaWNhdGlvbilbMF09PWlbMF0mJm9bMV09PWlbMV0pe24ubmV4dD02O2JyZWFrfXRocm93IEVycm9yKCJJbnZhbGlkIHBhc3dvcmQiKTtjYXNlIDY6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuKX0pKSksZGcuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIHlnKG4scil7cmV0dXJuIHdnLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiB3Zygpe3JldHVybiB3Zz1xcChyZWdlbmVyYXRvclJ1bnRpbWUubWFyaygoZnVuY3Rpb24gbihyLHQpe3ZhciBlO3JldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcCgoZnVuY3Rpb24obil7Zm9yKDs7KXN3aXRjaChuLlA9bi5uZXh0KXtjYXNlIDA6cmV0dXJuIGU9Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShlZ1tyLlVyXSkpLG4ubmV4dD0zLGJnKHIsdCxlKTtjYXNlIDM6cmV0dXJuIG4uZygicmV0dXJuIixnZyhlLHIua2V5cy5wYXNzd29yZFZlcmlmaWNhdGlvbikpO2Nhc2UgNDpjYXNlImVuZCI6cmV0dXJuIG4uc3RvcCgpfX0pLG4pfSkpKSx3Zy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gYmcobixyLHQpe3JldHVybiBwZy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gcGcoKXtyZXR1cm4ocGc9cXAocmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoKGZ1bmN0aW9uIG4ocix0LGUpe3ZhciBpLG8sdSxmO3JldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcCgoZnVuY3Rpb24obil7Zm9yKDs7KXN3aXRjaChuLlA9bi5uZXh0KXtjYXNlIDA6cmV0dXJuIGk9V2IodCksbi5uZXh0PTMsY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoInJhdyIsaSxuZywhMSx0Zyk7Y2FzZSAzOnJldHVybiBvPW4uaCxuLm5leHQ9NixjcnlwdG8uc3VidGxlLmRlcml2ZUJpdHMoT2JqZWN0LmFzc2lnbih7c2FsdDplfSxyZyksbyw4KigyKmlnW3IuVXJdKzIpKTtjYXNlIDY6dT1uLmgsZj1uZXcgVWludDhBcnJheSh1KSxyLmtleXM9e2tleTp1Zy5abihtZyhmLDAsaWdbci5Vcl0pKSxMcjp1Zy5abihtZyhmLGlnW3IuVXJdLDIqaWdbci5Vcl0pKSxwYXNzd29yZFZlcmlmaWNhdGlvbjptZyhmLDIqaWdbci5Vcl0pfTtjYXNlIDk6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuKX0pKSkpLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBnZyhuLHIpe3ZhciB0PW47cmV0dXJuIG4ubGVuZ3RoK3IubGVuZ3RoJiYoKHQ9bmV3IFVpbnQ4QXJyYXkobi5sZW5ndGgrci5sZW5ndGgpKS5zZXQobiwwKSx0LnNldChyLG4ubGVuZ3RoKSksdH1mdW5jdGlvbiBtZyhuLHIsdCl7cmV0dXJuIG4uc3ViYXJyYXkocix0KX12YXIgQWc9TWF0aC5pbXVsO2Z1bmN0aW9uIGtnKG4scil7aWYoIShuIGluc3RhbmNlb2YgcikpdGhyb3cgbmV3IFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uIil9ZnVuY3Rpb24gU2cobixyKXtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKyl7dmFyIGU9clt0XTtlLnQ9ZS50fHwhMSxlLmk9ITAsInZhbHVlImluIGUmJihlLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobixlLmtleSxlKX19ZnVuY3Rpb24gamcobixyLHQpe3JldHVybiByJiZTZyhuLnByb3RvdHlwZSxyKSx0JiZTZyhuLHQpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLCJwcm90b3R5cGUiLHt3cml0YWJsZTohMX0pLG59TGUoe3RhcmdldDoiTWF0aCIsdW46ITAsZm46aSgoZnVuY3Rpb24oKXtyZXR1cm4tNSE9QWcoNDI5NDk2NzI5NSw1KXx8MiE9QWcubGVuZ3RofSkpfSx7aW11bDpmdW5jdGlvbihuLHIpe3ZhciB0PTY1NTM1LGU9K24saT0rcixvPXQmZSx1PXQmaTtyZXR1cm4gMHxvKnUrKCh0JmU+Pj4xNikqdStvKih0Jmk+Pj4xNik8PDE2Pj4+MCl9fSk7dmFyIE9nPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyLHQpe2tnKHRoaXMsbiksT2JqZWN0LmFzc2lnbih0aGlzLHtwYXNzd29yZDpyLHBhc3N3b3JkVmVyaWZpY2F0aW9uOnR9KSxVZyh0aGlzLHIpfXJldHVybiBqZyhuLFt7a2V5OiJhcHBlbmQiLHZhbHVlOmZ1bmN0aW9uKG4pe3ZhciByPXRoaXM7aWYoci5wYXNzd29yZCl7dmFyIHQ9VGcocixuLnN1YmFycmF5KDAsMTIpKTtpZihyLnBhc3N3b3JkPW51bGwsdFsxMV0hPXIucGFzc3dvcmRWZXJpZmljYXRpb24pdGhyb3cgRXJyb3IoIkludmFsaWQgcGFzd29yZCIpO249bi5zdWJhcnJheSgxMil9cmV0dXJuIFRnKHIsbil9fSx7a2V5OiJmbHVzaCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm57dmFsaWQ6ITAsZGF0YTpuZXcgVWludDhBcnJheSgwKX19fV0pLG59KCksRWc9ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKHIsdCl7a2codGhpcyxuKSxPYmplY3QuYXNzaWduKHRoaXMse3Bhc3N3b3JkOnIscGFzc3dvcmRWZXJpZmljYXRpb246dH0pLFVnKHRoaXMscil9cmV0dXJuIGpnKG4sW3trZXk6ImFwcGVuZCIsdmFsdWU6ZnVuY3Rpb24obil7dmFyIHIsdCxlPXRoaXM7aWYoZS5wYXNzd29yZCl7ZS5wYXNzd29yZD1udWxsO3ZhciBpPWNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTIpKTtpWzExXT1lLnBhc3N3b3JkVmVyaWZpY2F0aW9uLChyPW5ldyBVaW50OEFycmF5KG4ubGVuZ3RoK2kubGVuZ3RoKSkuc2V0KFJnKGUsaSksMCksdD0xMn1lbHNlIHI9bmV3IFVpbnQ4QXJyYXkobi5sZW5ndGgpLHQ9MDtyZXR1cm4gci5zZXQoUmcoZSxuKSx0KSxyfX0se2tleToiZmx1c2giLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJue2RhdGE6bmV3IFVpbnQ4QXJyYXkoMCl9fX1dKSxufSgpO2Z1bmN0aW9uIFRnKG4scil7Zm9yKHZhciB0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoKSxlPTA7ZTxyLmxlbmd0aDtlKyspdFtlXT1JZyhuKV5yW2VdLE1nKG4sdFtlXSk7cmV0dXJuIHR9ZnVuY3Rpb24gUmcobixyKXtmb3IodmFyIHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgpLGU9MDtlPHIubGVuZ3RoO2UrKyl0W2VdPUlnKG4pXnJbZV0sTWcobixyW2VdKTtyZXR1cm4gdH1mdW5jdGlvbiBVZyhuLHIpe24ua2V5cz1bMzA1NDE5ODk2LDU5MTc1MTA0OSw4NzgwODIxOTJdLG4uUHI9bmV3IGliKG4ua2V5c1swXSksbi5Dcj1uZXcgaWIobi5rZXlzWzJdKTtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylNZyhuLHIuY2hhckNvZGVBdCh0KSl9ZnVuY3Rpb24gTWcobixyKXtuLlByLmFwcGVuZChbcl0pLG4ua2V5c1swXT1+bi5Qci5nZXQoKSxuLmtleXNbMV09eGcobi5rZXlzWzFdK19nKG4ua2V5c1swXSkpLG4ua2V5c1sxXT14ZyhNYXRoLmltdWwobi5rZXlzWzFdLDEzNDc3NTgxMykrMSksbi5Dci5hcHBlbmQoW24ua2V5c1sxXT4+PjI0XSksbi5rZXlzWzJdPX5uLkNyLmdldCgpfWZ1bmN0aW9uIElnKG4pe3ZhciByPTJ8bi5rZXlzWzJdO3JldHVybiBfZyhNYXRoLmltdWwociwxXnIpPj4+OCl9ZnVuY3Rpb24gX2cobil7cmV0dXJuIDI1NSZufWZ1bmN0aW9uIHhnKG4pe3JldHVybiA0Mjk0OTY3Mjk1Jm59ZnVuY3Rpb24gTGcobixyLHQsZSxpLG8sdSl7dHJ5e3ZhciBmPW5bb10odSksYT1mLnZhbHVlfWNhdGNoKG4pe3JldHVybiB2b2lkIHQobil9Zi5kb25lP3IoYSk6UHJvbWlzZS5yZXNvbHZlKGEpLnRoZW4oZSxpKX1mdW5jdGlvbiBQZyhuKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgcj10aGlzLHQ9YXJndW1lbnRzO3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24oZSxpKXt2YXIgbz1uLmFwcGx5KHIsdCk7ZnVuY3Rpb24gdShuKXtMZyhvLGUsaSx1LGYsIm5leHQiLG4pfWZ1bmN0aW9uIGYobil7TGcobyxlLGksdSxmLCJ0aHJvdyIsbil9dSh2b2lkIDApfSkpfX1mdW5jdGlvbiBDZyhuLHIpe2lmKCEobiBpbnN0YW5jZW9mIHIpKXRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpfWZ1bmN0aW9uIEZnKG4scil7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe3ZhciBlPXJbdF07ZS50PWUudHx8ITEsZS5pPSEwLCJ2YWx1ZSJpbiBlJiYoZS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sZS5rZXksZSl9fWZ1bmN0aW9uIE5nKG4scix0KXtyZXR1cm4gciYmRmcobi5wcm90b3R5cGUsciksdCYmRmcobix0KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobiwicHJvdG90eXBlIix7d3JpdGFibGU6ITF9KSxufXZhciBCZz1mdW5jdGlvbigpe2Z1bmN0aW9uIG4ocix0LGUpe3ZhciBpPXQuc2lnbmF0dXJlLG89dC5wYXNzd29yZCx1PXQuc2lnbmVkLGY9dC5jb21wcmVzc2VkLGE9dC56aXBDcnlwdG8sYz10LnBhc3N3b3JkVmVyaWZpY2F0aW9uLHM9dC5lbmNyeXB0aW9uU3RyZW5ndGgsdj1lLkZyO0NnKHRoaXMsbik7dmFyIGg9ISFvO09iamVjdC5hc3NpZ24odGhpcyx7c2lnbmF0dXJlOmksZW5jcnlwdGVkOmgsc2lnbmVkOnUsY29tcHJlc3NlZDpmLE5yOmYmJm5ldyByKHtGcjp2fSksQnI6dSYmbmV3IGliLHppcENyeXB0bzphLGRlY3J5cHQ6aCYmYT9uZXcgT2cobyxjKTpuZXcgc2cobyx1LHMpfSl9dmFyIHI7cmV0dXJuIE5nKG4sW3trZXk6ImFwcGVuZCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgbj1QZyhyZWdlbmVyYXRvclJ1bnRpbWUubWFyaygoZnVuY3Rpb24gbihyKXt2YXIgdDtyZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoKGZ1bmN0aW9uKG4pe2Zvcig7Oylzd2l0Y2gobi5QPW4ubmV4dCl7Y2FzZSAwOmlmKCEodD10aGlzKS5lbmNyeXB0ZWR8fCFyLmxlbmd0aCl7bi5uZXh0PTU7YnJlYWt9cmV0dXJuIG4ubmV4dD00LHQuZGVjcnlwdC5hcHBlbmQocik7Y2FzZSA0OnI9bi5oO2Nhc2UgNTppZighdC5jb21wcmVzc2VkfHwhci5sZW5ndGgpe24ubmV4dD05O2JyZWFrfXJldHVybiBuLm5leHQ9OCx0Lk5yLmFwcGVuZChyKTtjYXNlIDg6cj1uLmg7Y2FzZSA5OnJldHVybighdC5lbmNyeXB0ZWR8fHQuemlwQ3J5cHRvKSYmdC5zaWduZWQmJnIubGVuZ3RoJiZ0LkJyLmFwcGVuZChyKSxuLmcoInJldHVybiIscik7Y2FzZSAxMTpjYXNlImVuZCI6cmV0dXJuIG4uc3RvcCgpfX0pLG4sdGhpcyl9KSkpO3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OiJmbHVzaCIsdmFsdWU6KHI9UGcocmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoKGZ1bmN0aW9uIG4oKXt2YXIgcix0LGUsaSxvO3JldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcCgoZnVuY3Rpb24obil7Zm9yKDs7KXN3aXRjaChuLlA9bi5uZXh0KXtjYXNlIDA6aWYocj10aGlzLGU9bmV3IFVpbnQ4QXJyYXkoMCksIXIuZW5jcnlwdGVkKXtuLm5leHQ9NzticmVha31pZigoaT1yLmRlY3J5cHQuZmx1c2goKSkudmFsaWQpe24ubmV4dD02O2JyZWFrfXRocm93IEVycm9yKCJJbnZhbGlkIHNpZ25hdHVyZSIpO2Nhc2UgNjplPWkuZGF0YTtjYXNlIDc6aWYoci5lbmNyeXB0ZWQmJiFyLnppcENyeXB0b3x8IXIuc2lnbmVkKXtuLm5leHQ9MTM7YnJlYWt9aWYobz1uZXcgRGF0YVZpZXcobmV3IFVpbnQ4QXJyYXkoNCkuYnVmZmVyKSx0PXIuQnIuZ2V0KCksby5zZXRVaW50MzIoMCx0KSxyLnNpZ25hdHVyZT09by5nZXRVaW50MzIoMCwhMSkpe24ubmV4dD0xMzticmVha310aHJvdyBFcnJvcigiSW52YWxpZCBzaWduYXR1cmUiKTtjYXNlIDEzOmlmKCFyLmNvbXByZXNzZWQpe24ubmV4dD0yMjticmVha31yZXR1cm4gbi5uZXh0PTE2LHIuTnIuYXBwZW5kKGUpO2Nhc2UgMTY6aWYobi5Ecj1uLmgsbi5Ecil7bi5uZXh0PTE5O2JyZWFrfW4uRHI9bmV3IFVpbnQ4QXJyYXkoMCk7Y2FzZSAxOTpyZXR1cm4gZT1uLkRyLG4ubmV4dD0yMixyLk5yLmZsdXNoKCk7Y2FzZSAyMjpyZXR1cm4gbi5nKCJyZXR1cm4iLHtkYXRhOmUsc2lnbmF0dXJlOnR9KTtjYXNlIDIzOmNhc2UiZW5kIjpyZXR1cm4gbi5zdG9wKCl9fSksbix0aGlzKX0pKSksZnVuY3Rpb24oKXtyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX1dKSxufSgpLERnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyLHQsZSl7dmFyIGk9dC5lbmNyeXB0ZWQsbz10LnNpZ25lZCx1PXQuY29tcHJlc3NlZCxmPXQubGV2ZWwsYT10LnppcENyeXB0byxjPXQucGFzc3dvcmQscz10LnBhc3N3b3JkVmVyaWZpY2F0aW9uLHY9dC5lbmNyeXB0aW9uU3RyZW5ndGgsaD1lLkZyO0NnKHRoaXMsbiksT2JqZWN0LmFzc2lnbih0aGlzLHtlbmNyeXB0ZWQ6aSxzaWduZWQ6byxjb21wcmVzc2VkOnUsR3I6dSYmbmV3IHIoe2xldmVsOmZ8fDUsRnI6aH0pLEJyOm8mJm5ldyBpYix6aXBDcnlwdG86YSxlbmNyeXB0OmkmJmE/bmV3IEVnKGMscyk6bmV3IHZnKGMsdil9KX12YXIgcix0O3JldHVybiBOZyhuLFt7a2V5OiJhcHBlbmQiLHZhbHVlOih0PVBnKHJlZ2VuZXJhdG9yUnVudGltZS5tYXJrKChmdW5jdGlvbiBuKHIpe3ZhciB0LGU7cmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKChmdW5jdGlvbihuKXtmb3IoOzspc3dpdGNoKG4uUD1uLm5leHQpe2Nhc2UgMDppZihlPXIsISh0PXRoaXMpLmNvbXByZXNzZWR8fCFyLmxlbmd0aCl7bi5uZXh0PTY7YnJlYWt9cmV0dXJuIG4ubmV4dD01LHQuR3IuYXBwZW5kKHIpO2Nhc2UgNTplPW4uaDtjYXNlIDY6aWYoIXQuZW5jcnlwdGVkfHwhZS5sZW5ndGgpe24ubmV4dD0xMDticmVha31yZXR1cm4gbi5uZXh0PTksdC5lbmNyeXB0LmFwcGVuZChlKTtjYXNlIDk6ZT1uLmg7Y2FzZSAxMDpyZXR1cm4oIXQuZW5jcnlwdGVkfHx0LnppcENyeXB0bykmJnQuc2lnbmVkJiZyLmxlbmd0aCYmdC5Cci5hcHBlbmQociksbi5nKCJyZXR1cm4iLGUpO2Nhc2UgMTI6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuLHRoaXMpfSkpKSxmdW5jdGlvbihuKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KX0se2tleToiZmx1c2giLHZhbHVlOihyPVBnKHJlZ2VuZXJhdG9yUnVudGltZS5tYXJrKChmdW5jdGlvbiBuKCl7dmFyIHIsdCxlLGksbztyZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoKGZ1bmN0aW9uKG4pe2Zvcig7Oylzd2l0Y2gobi5QPW4ubmV4dCl7Y2FzZSAwOmlmKHI9dGhpcyxlPW5ldyBVaW50OEFycmF5KDApLCFyLmNvbXByZXNzZWQpe24ubmV4dD05O2JyZWFrfXJldHVybiBuLm5leHQ9NSxyLkdyLmZsdXNoKCk7Y2FzZSA1OmlmKG4uRHI9bi5oLG4uRHIpe24ubmV4dD04O2JyZWFrfW4uRHI9bmV3IFVpbnQ4QXJyYXkoMCk7Y2FzZSA4OmU9bi5EcjtjYXNlIDk6aWYoIXIuZW5jcnlwdGVkKXtuLm5leHQ9MTk7YnJlYWt9cmV0dXJuIG4ubmV4dD0xMixyLmVuY3J5cHQuYXBwZW5kKGUpO2Nhc2UgMTI6ZT1uLmgsaT1yLmVuY3J5cHQuZmx1c2goKSx0PWkuc2lnbmF0dXJlLChvPW5ldyBVaW50OEFycmF5KGUubGVuZ3RoK2kuZGF0YS5sZW5ndGgpKS5zZXQoZSwwKSxvLnNldChpLmRhdGEsZS5sZW5ndGgpLGU9bztjYXNlIDE5OnJldHVybiByLmVuY3J5cHRlZCYmIXIuemlwQ3J5cHRvfHwhci5zaWduZWR8fCh0PXIuQnIuZ2V0KCkpLG4uZygicmV0dXJuIix7ZGF0YTplLHNpZ25hdHVyZTp0fSk7Y2FzZSAyMTpjYXNlImVuZCI6cmV0dXJuIG4uc3RvcCgpfX0pLG4sdGhpcyl9KSkpLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfSl9XSksbn0oKTtmdW5jdGlvbiBHZyhuLHIsdCxlLGksbyx1KXt0cnl7dmFyIGY9bltvXSh1KSxhPWYudmFsdWV9Y2F0Y2gobil7cmV0dXJuIHZvaWQgdChuKX1mLmRvbmU/cihhKTpQcm9taXNlLnJlc29sdmUoYSkudGhlbihlLGkpfWZ1bmN0aW9uIFZnKG4pe3JldHVybiBmdW5jdGlvbigpe3ZhciByPXRoaXMsdD1hcmd1bWVudHM7cmV0dXJuIG5ldyBQcm9taXNlKChmdW5jdGlvbihlLGkpe3ZhciBvPW4uYXBwbHkocix0KTtmdW5jdGlvbiB1KG4pe0dnKG8sZSxpLHUsZiwibmV4dCIsbil9ZnVuY3Rpb24gZihuKXtHZyhvLGUsaSx1LGYsInRocm93IixuKX11KHZvaWQgMCl9KSl9fXZhciBZZyx6Zz17aW5pdDpmdW5jdGlvbihuKXtuLnNjcmlwdHMmJm4uc2NyaXB0cy5sZW5ndGgmJmltcG9ydFNjcmlwdHMuYXBwbHkodm9pZCAwLG4uc2NyaXB0cyk7dmFyIHIsdD1uLm9wdGlvbnM7c2VsZi5pbml0Q29kZWMmJnNlbGYuaW5pdENvZGVjKCksdC5jb2RlY1R5cGUuc3RhcnRzV2l0aCgiZGVmbGF0ZSIpP3I9c2VsZi5EZWZsYXRlOnQuY29kZWNUeXBlLnN0YXJ0c1dpdGgoImluZmxhdGUiKSYmKHI9c2VsZi5JbmZsYXRlKSxZZz1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIuY29kZWNUeXBlLnN0YXJ0c1dpdGgoImRlZmxhdGUiKT9uZXcgRGcobixyLHQpOnIuY29kZWNUeXBlLnN0YXJ0c1dpdGgoImluZmxhdGUiKT9uZXcgQmcobixyLHQpOnZvaWQgMH0ocix0LG4uY29uZmlnKX0sYXBwZW5kOmZ1bmN0aW9uKG4pe3JldHVybiBWZyhyZWdlbmVyYXRvclJ1bnRpbWUubWFyaygoZnVuY3Rpb24gcigpe3JldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcCgoZnVuY3Rpb24ocil7Zm9yKDs7KXN3aXRjaChyLlA9ci5uZXh0KXtjYXNlIDA6cmV0dXJuIHIubmV4dD0yLFlnLmFwcGVuZChuLmRhdGEpO2Nhc2UgMjpyZXR1cm4gci5Ecj1yLmgsci5nKCJyZXR1cm4iLHtkYXRhOnIuRHJ9KTtjYXNlIDQ6Y2FzZSJlbmQiOnJldHVybiByLnN0b3AoKX19KSxyKX0pKSkoKX0sZmx1c2g6ZnVuY3Rpb24oKXtyZXR1cm4gWWcuZmx1c2goKX19O2FkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGZ1bmN0aW9uKCl7dmFyIG49VmcocmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoKGZ1bmN0aW9uIG4ocil7dmFyIHQsZSxpLG87cmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKChmdW5jdGlvbihuKXtmb3IoOzspc3dpdGNoKG4uUD1uLm5leHQpe2Nhc2UgMDppZih0PXIuZGF0YSxlPXQudHlwZSwhKGk9emdbZV0pKXtuLm5leHQ9MTk7YnJlYWt9cmV0dXJuIG4uUD00LHQuZGF0YSYmKHQuZGF0YT1uZXcgVWludDhBcnJheSh0LmRhdGEpKSxuLm5leHQ9OCxpKHQpO2Nhc2UgODppZihuLkRyPW4uaCxuLkRyKXtuLm5leHQ9MTE7YnJlYWt9bi5Ecj17fTtjYXNlIDExOmlmKChvPW4uRHIpLnR5cGU9ZSxvLmRhdGEpdHJ5e28uZGF0YT1vLmRhdGEuYnVmZmVyLHBvc3RNZXNzYWdlKG8sW28uZGF0YV0pfWNhdGNoKG4pe3Bvc3RNZXNzYWdlKG8pfWVsc2UgcG9zdE1lc3NhZ2Uobyk7bi5uZXh0PTE5O2JyZWFrO2Nhc2UgMTY6bi5QPTE2LG4uVnI9bi5jYXRjaCg0KSxwb3N0TWVzc2FnZSh7dHlwZTplLGVycm9yOnttZXNzYWdlOm4uVnIubWVzc2FnZSxzdGFjazpuLlZyLnN0YWNrfX0pO2Nhc2UgMTk6Y2FzZSJlbmQiOnJldHVybiBuLnN0b3AoKX19KSxuLG51bGwsW1s0LDE2XV0pfSkpKTtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKSk7dmFyIFdnPWZzLm1hcDtMZSh7dGFyZ2V0OiJBcnJheSIsY246ITAsZm46IXFiKCJtYXAiKX0se21hcDpmdW5jdGlvbihuKXtyZXR1cm4gV2codGhpcyxuLGFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwKX19KTt2YXIgSGc9Vmk7TGUoe3RhcmdldDoiQXJyYXkiLGNuOiEwfSx7ZmlsbDpndX0pLEhnKCJmaWxsIiksKDAsZGEuZXhwb3J0cykoIlVpbnQxNiIsKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihyLHQsZSl7cmV0dXJuIG4odGhpcyxyLHQsZSl9fSkpO3ZhciAkZz17fSxLZz1PLHFnPUMsSmc9eHQuZixYZz1VdSxRZz0ib2JqZWN0Ij09dHlwZW9mIHdpbmRvdyYmd2luZG93JiZPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcz9PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpOltdOyRnLmY9ZnVuY3Rpb24obil7cmV0dXJuIFFnJiYiV2luZG93Ij09S2cobik/ZnVuY3Rpb24obil7dHJ5e3JldHVybiBKZyhuKX1jYXRjaChuKXtyZXR1cm4gWGcoUWcpfX0obik6SmcocWcobikpfTt2YXIgWmc9e30sbm09cW47WmcuZj1ubTt2YXIgcm09dCx0bT14bixlbT1aZyxpbT1tci5mLG9tPWZ1bmN0aW9uKG4pe3ZhciByPXJtLlN5bWJvbHx8KHJtLlN5bWJvbD17fSk7dG0ocixuKXx8aW0ocixuLHt2YWx1ZTplbS5mKG4pfSl9LHVtPUxlLGZtPXQsYW09WSxjbT1saCxzbT1hLHZtPUEsaG09byxsbT1ubixkbT1pLHltPXhuLHdtPUhjLGJtPUYscG09QixnbT16LG1tPWFuLEFtPUVyLGttPU1uLFNtPUMsam09aXIsT209S2UsRW09eSxUbT1MaSxSbT1kaSxVbT14dCxNbT0kZyxJbT11ZSxfbT1lLHhtPW1yLExtPXZpLFBtPWMsQ209dGwsRm09TnIuZXhwb3J0cyxObT1Bbi5leHBvcnRzLEJtPW50LERtPU5uLEdtPXFuLFZtPVpnLFltPW9tLHptPXZvLFdtPWJ0LEhtPWZzLmZvckVhY2gsJG09WnIoImhpZGRlbiIpLEttPUdtKCJ0b1ByaW1pdGl2ZSIpLHFtPVdtLnNldCxKbT1XbS5KKCJTeW1ib2wiKSxYbT1PYmplY3QucHJvdG90eXBlLFFtPWZtLlN5bWJvbCxabT1RbSYmUW0ucHJvdG90eXBlLG5BPWZtLlR5cGVFcnJvcixyQT1mbS5Zcix0QT1hbSgiSlNPTiIsInN0cmluZ2lmeSIpLGVBPV9tLmYsaUE9eG0uZixvQT1NbS5mLHVBPVBtLmYsZkE9dm0oW10ucHVzaCksYUE9Tm0oInN5bWJvbHMiKSxjQT1ObSgib3Atc3ltYm9scyIpLHNBPU5tKCJzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5IiksdkE9Tm0oInN5bWJvbC10by1zdHJpbmctcmVnaXN0cnkiKSxoQT1ObSgid2tzIiksbEE9IXJBfHwhckEucHJvdG90eXBlfHwhckEucHJvdG90eXBlLnpyLGRBPWhtJiZkbSgoZnVuY3Rpb24oKXtyZXR1cm4gNyE9VG0oaUEoe30sImEiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaUEodGhpcywiYSIse3ZhbHVlOjd9KS5hfX0pKS5hfSkpP2Z1bmN0aW9uKG4scix0KXt2YXIgZT1lQShYbSxyKTtlJiZkZWxldGUgWG1bcl0saUEobixyLHQpLGUmJm4hPT1YbSYmaUEoWG0scixlKX06aUEseUE9ZnVuY3Rpb24obixyKXt2YXIgdD1hQVtuXT1UbShabSk7cmV0dXJuIHFtKHQse3R5cGU6IlN5bWJvbCIsdGFnOm4sZGVzY3JpcHRpb246cn0pLGhtfHwodC5kZXNjcmlwdGlvbj1yKSx0fSx3QT1mdW5jdGlvbihuLHIsdCl7bj09PVhtJiZ3QShjQSxyLHQpLEFtKG4pO3ZhciBlPWptKHIpO3JldHVybiBBbSh0KSx5bShhQSxlKT8odC50Pyh5bShuLCRtKSYmblskbV1bZV0mJihuWyRtXVtlXT0hMSksdD1UbSh0LHt0OkVtKDAsITEpfSkpOih5bShuLCRtKXx8aUEobiwkbSxFbSgxLHt9KSksblskbV1bZV09ITApLGRBKG4sZSx0KSk6aUEobixlLHQpfSxiQT1mdW5jdGlvbihuLHIpe0FtKG4pO3ZhciB0PVNtKHIpLGU9Um0odCkuY29uY2F0KEFBKHQpKTtyZXR1cm4gSG0oZSwoZnVuY3Rpb24ocil7aG0mJiFzbShwQSx0LHIpfHx3QShuLHIsdFtyXSl9KSksbn0scEE9ZnVuY3Rpb24obil7dmFyIHI9am0obiksdD1zbSh1QSx0aGlzLHIpO3JldHVybiEodGhpcz09PVhtJiZ5bShhQSxyKSYmIXltKGNBLHIpKSYmKCEodHx8IXltKHRoaXMscil8fCF5bShhQSxyKXx8eW0odGhpcywkbSkmJnRoaXNbJG1dW3JdKXx8dCl9LGdBPWZ1bmN0aW9uKG4scil7dmFyIHQ9U20obiksZT1qbShyKTtpZih0IT09WG18fCF5bShhQSxlKXx8eW0oY0EsZSkpe3ZhciBpPWVBKHQsZSk7cmV0dXJuIWl8fCF5bShhQSxlKXx8eW0odCwkbSkmJnRbJG1dW2VdfHwoaS50PSEwKSxpfX0sbUE9ZnVuY3Rpb24obil7dmFyIHI9b0EoU20obikpLHQ9W107cmV0dXJuIEhtKHIsKGZ1bmN0aW9uKG4pe3ltKGFBLG4pfHx5bShCbSxuKXx8ZkEodCxuKX0pKSx0fSxBQT1mdW5jdGlvbihuKXt2YXIgcj1uPT09WG0sdD1vQShyP2NBOlNtKG4pKSxlPVtdO3JldHVybiBIbSh0LChmdW5jdGlvbihuKXsheW0oYUEsbil8fHImJiF5bShYbSxuKXx8ZkEoZSxhQVtuXSl9KSksZX07aWYobG18fChGbShabT0oUW09ZnVuY3Rpb24oKXtpZihnbShabSx0aGlzKSl0aHJvdyBuQSgiU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIik7dmFyIG49YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP09tKGFyZ3VtZW50c1swXSk6dm9pZCAwLHI9RG0obiksdD1mdW5jdGlvbihuKXt0aGlzPT09WG0mJnNtKHQsY0EsbikseW0odGhpcywkbSkmJnltKHRoaXNbJG1dLHIpJiYodGhpc1skbV1bcl09ITEpLGRBKHRoaXMscixFbSgxLG4pKX07cmV0dXJuIGhtJiZsQSYmZEEoWG0scix7aTohMCxzZXQ6dH0pLHlBKHIsbil9KS5wcm90b3R5cGUsInRvU3RyaW5nIiwoZnVuY3Rpb24oKXtyZXR1cm4gSm0odGhpcykudGFnfSkpLEZtKFFtLCJ3aXRob3V0U2V0dGVyIiwoZnVuY3Rpb24obil7cmV0dXJuIHlBKERtKG4pLG4pfSkpLFBtLmY9cEEseG0uZj13QSxMbS5mPWJBLF9tLmY9Z0EsVW0uZj1NbS5mPW1BLEltLmY9QUEsVm0uZj1mdW5jdGlvbihuKXtyZXR1cm4geUEoR20obiksbil9LGhtJiYoaUEoWm0sImRlc2NyaXB0aW9uIix7aTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gSm0odGhpcykuZGVzY3JpcHRpb259fSksRm0oWG0sInByb3BlcnR5SXNFbnVtZXJhYmxlIixwQSx7cm46ITB9KSkpLHVtKHtnbG9iYWw6ITAsd3JhcDohMCxmbjohbG0sRzohbG19LHtTeW1ib2w6UW19KSxIbShSbShoQSksKGZ1bmN0aW9uKG4pe1ltKG4pfSkpLHVtKHt0YXJnZXQ6IlN5bWJvbCIsdW46ITAsZm46IWxtfSx7Zm9yOmZ1bmN0aW9uKG4pe3ZhciByPU9tKG4pO2lmKHltKHNBLHIpKXJldHVybiBzQVtyXTt2YXIgdD1RbShyKTtyZXR1cm4gc0Fbcl09dCx2QVt0XT1yLHR9LGtleUZvcjpmdW5jdGlvbihuKXtpZighbW0obikpdGhyb3cgbkEobisiIGlzIG5vdCBhIHN5bWJvbCIpO2lmKHltKHZBLG4pKXJldHVybiB2QVtuXX0sV3I6ZnVuY3Rpb24oKXtsQT0hMH0sSHI6ZnVuY3Rpb24oKXtsQT0hMX19KSx1bSh7dGFyZ2V0OiJPYmplY3QiLHVuOiEwLGZuOiFsbSxHOiFobX0se2NyZWF0ZTpmdW5jdGlvbihuLHIpe3JldHVybiB2b2lkIDA9PT1yP1RtKG4pOmJBKFRtKG4pLHIpfSxkZWZpbmVQcm9wZXJ0eTp3QSxkZWZpbmVQcm9wZXJ0aWVzOmJBLGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpnQX0pLHVtKHt0YXJnZXQ6Ik9iamVjdCIsdW46ITAsZm46IWxtfSx7Z2V0T3duUHJvcGVydHlOYW1lczptQSxnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6QUF9KSx1bSh7dGFyZ2V0OiJPYmplY3QiLHVuOiEwLGZuOmRtKChmdW5jdGlvbigpe0ltLmYoMSl9KSl9LHtnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ZnVuY3Rpb24obil7cmV0dXJuIEltLmYoa20obikpfX0pLHRBJiZ1bSh7dGFyZ2V0OiJKU09OIix1bjohMCxmbjohbG18fGRtKChmdW5jdGlvbigpe3ZhciBuPVFtKCk7cmV0dXJuIltudWxsXSIhPXRBKFtuXSl8fCJ7fSIhPXRBKHthOm59KXx8Int9IiE9dEEoT2JqZWN0KG4pKX0pKX0se3N0cmluZ2lmeTpmdW5jdGlvbihuLHIsdCl7dmFyIGU9Q20oYXJndW1lbnRzKSxpPXI7aWYoKHBtKHIpfHx2b2lkIDAhPT1uKSYmIW1tKG4pKXJldHVybiB3bShyKXx8KHI9ZnVuY3Rpb24obixyKXtpZihibShpKSYmKHI9c20oaSx0aGlzLG4scikpLCFtbShyKSlyZXR1cm4gcn0pLGVbMV09cixjbSh0QSxudWxsLGUpfX0pLCFabVtLbV0pe3ZhciBrQT1abS52YWx1ZU9mO0ZtKFptLEttLChmdW5jdGlvbigpe3JldHVybiBzbShrQSx0aGlzKX0pKX16bShRbSwiU3ltYm9sIiksQm1bJG1dPSEwO3ZhciBTQT1MZSxqQT1vLE9BPXQsRUE9QSxUQT14bixSQT1GLFVBPXosTUE9S2UsSUE9bXIuZixfQT1iZSx4QT1PQS5TeW1ib2wsTEE9eEEmJnhBLnByb3RvdHlwZTtpZihqQSYmUkEoeEEpJiYoISgiZGVzY3JpcHRpb24iaW4gTEEpfHx2b2lkIDAhPT14QSgpLmRlc2NyaXB0aW9uKSl7dmFyIFBBPXt9LENBPWZ1bmN0aW9uKCl7dmFyIG49MT5hcmd1bWVudHMubGVuZ3RofHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/dm9pZCAwOk1BKGFyZ3VtZW50c1swXSkscj1VQShMQSx0aGlzKT9uZXcgeEEobik6dm9pZCAwPT09bj94QSgpOnhBKG4pO3JldHVybiIiPT09biYmKFBBW3JdPSEwKSxyfTtfQShDQSx4QSksQ0EucHJvdG90eXBlPUxBLExBLmNvbnN0cnVjdG9yPUNBO3ZhciBGQT14QSgidGVzdCIpKyIiPT0iU3ltYm9sKHRlc3QpIixOQT1FQShMQS50b1N0cmluZyksQkE9RUEoTEEudmFsdWVPZiksREE9L15TeW1ib2xcKCguKilcKVteKV0rJC8sR0E9RUEoIiIucmVwbGFjZSksVkE9RUEoIiIuc2xpY2UpO0lBKExBLCJkZXNjcmlwdGlvbiIse2k6ITAsZ2V0OmZ1bmN0aW9uKCl7dmFyIG49QkEodGhpcykscj1OQShuKTtpZihUQShQQSxuKSlyZXR1cm4iIjt2YXIgdD1GQT9WQShyLDcsLTEpOkdBKHIsREEsIiQxIik7cmV0dXJuIiI9PT10P3ZvaWQgMDp0fX0pLFNBKHtnbG9iYWw6ITAsZm46ITB9LHtTeW1ib2w6Q0F9KX1vbSgiaXRlcmF0b3IiKTt2YXIgWUE9byx6QT1rdC5YLFdBPUEsSEE9bXIuZiwkQT1GdW5jdGlvbi5wcm90b3R5cGUsS0E9V0EoJEEudG9TdHJpbmcpLHFBPS9mdW5jdGlvblxiKD86XHN8XC9cKltcU1xzXSo/XCpcL3xcL1wvW15cblxyXSpbXG5ccl0rKSooW15ccygvXSopLyxKQT1XQShxQS5leGVjKTtZQSYmIXpBJiZIQSgkQSwibmFtZSIse2k6ITAsZ2V0OmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBKQShxQSxLQSh0aGlzKSlbMV19Y2F0Y2gobil7cmV0dXJuIiJ9fX0pO3ZhciBYQSxRQSxaQSxuayxyaz1Fcix0az1pLGVrPXQuUmVnRXhwLGlrPXRrKChmdW5jdGlvbigpe3ZhciBuPWVrKCJhIiwieSIpO3JldHVybiBuLmxhc3RJbmRleD0yLG51bGwhPW4uZXhlYygiYWJjZCIpfSkpLG9rPWlrfHx0aygoZnVuY3Rpb24oKXtyZXR1cm4hZWsoImEiLCJ5Iikuc3RpY2t5fSkpLHVrPXskcjppa3x8dGsoKGZ1bmN0aW9uKCl7dmFyIG49ZWsoIl5yIiwiZ3kiKTtyZXR1cm4gbi5sYXN0SW5kZXg9MixudWxsIT1uLmV4ZWMoInN0ciIpfSkpLEtyOm9rLHFyOmlrfSxmaz1pLGFrPXQuUmVnRXhwLGNrPWZrKChmdW5jdGlvbigpe3ZhciBuPWFrKCIuIiwicyIpO3JldHVybiEobi5kb3RBbGwmJm4uZXhlYygiXG4iKSYmInMiPT09bi5mbGFncyl9KSksc2s9aSx2az10LlJlZ0V4cCxoaz1zaygoZnVuY3Rpb24oKXt2YXIgbj12aygiKD88YT5iKSIsImciKTtyZXR1cm4iYiIhPT1uLmV4ZWMoImIiKS5Kci5hfHwiYmMiIT09ImIiLnJlcGxhY2UobiwiJDxhPmMiKX0pKSxsaz1hLGRrPUEseWs9S2Usd2s9ZnVuY3Rpb24oKXt2YXIgbj1yayh0aGlzKSxyPSIiO3JldHVybiBuLmdsb2JhbCYmKHIrPSJnIiksbi5pZ25vcmVDYXNlJiYocis9ImkiKSxuLm11bHRpbGluZSYmKHIrPSJtIiksbi5kb3RBbGwmJihyKz0icyIpLG4udW5pY29kZSYmKHIrPSJ1Iiksbi5zdGlja3kmJihyKz0ieSIpLHJ9LGJrPXVrLHBrPUFuLmV4cG9ydHMsZ2s9TGksbWs9YnQuZ2V0LEFrPWNrLGtrPWhrLFNrPXBrKCJuYXRpdmUtc3RyaW5nLXJlcGxhY2UiLCIiLnJlcGxhY2UpLGprPS90Ly5leGVjLE9rPWprLEVrPWRrKCIiLmNoYXJBdCksVGs9ZGsoIiIuaW5kZXhPZiksUms9ZGsoIiIucmVwbGFjZSksVWs9ZGsoIiIuc2xpY2UpLE1rPShRQT0vYiovZyxsayhqayxYQT0vYS8sImEiKSxsayhqayxRQSwiYSIpLDAhPT1YQS5sYXN0SW5kZXh8fDAhPT1RQS5sYXN0SW5kZXgpLElrPWJrLiRyLF9rPXZvaWQgMCE9PS8oKT8/Ly5leGVjKCIiKVsxXTtmdW5jdGlvbiB4ayhuKXtyZXR1cm4gZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlyZXR1cm4gUGsobil9KG4pfHxmdW5jdGlvbihuKXtpZigidW5kZWZpbmVkIiE9dHlwZW9mIFN5bWJvbCYmbnVsbCE9bltTeW1ib2wuaXRlcmF0b3JdfHxudWxsIT1uWyJAQGl0ZXJhdG9yIl0pcmV0dXJuIEFycmF5LmZyb20obil9KG4pfHxMayhuKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC4iKX0oKX1mdW5jdGlvbiBMayhuLHIpe2lmKG4pe2lmKCJzdHJpbmciPT10eXBlb2YgbilyZXR1cm4gUGsobixyKTt2YXIgdD17fS50b1N0cmluZy5jYWxsKG4pLnNsaWNlKDgsLTEpO3JldHVybiJPYmplY3QiPT09dCYmbi5jb25zdHJ1Y3RvciYmKHQ9bi5jb25zdHJ1Y3Rvci5uYW1lKSwiTWFwIj09PXR8fCJTZXQiPT09dD9BcnJheS5mcm9tKG4pOiJBcmd1bWVudHMiPT09dHx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QodCk/UGsobixyKTp2b2lkIDB9fWZ1bmN0aW9uIFBrKG4scil7KG51bGw9PXJ8fHI+bi5sZW5ndGgpJiYocj1uLmxlbmd0aCk7Zm9yKHZhciB0PTAsZT1BcnJheShyKTtyPnQ7dCsrKWVbdF09blt0XTtyZXR1cm4gZX1mdW5jdGlvbiBDayhuKXtyZXR1cm4gRmsobi5tYXAoKGZ1bmN0aW9uKG4pe3ZhciByLHQ9ZnVuY3Rpb24obil7aWYoQXJyYXkuaXNBcnJheShuKSlyZXR1cm4gbn0ocj1uKXx8ZnVuY3Rpb24obil7dmFyIHI9bnVsbD09bj9udWxsOiJ1bmRlZmluZWQiIT10eXBlb2YgU3ltYm9sJiZuW1N5bWJvbC5pdGVyYXRvcl18fG5bIkBAaXRlcmF0b3IiXTtpZihudWxsIT1yKXt2YXIgdCxlLGk9W10sbz0hMCx1PSExO3RyeXtmb3Iocj1yLmNhbGwobik7IShvPSh0PXIubmV4dCgpKS5kb25lKSYmKGkucHVzaCh0LnZhbHVlKSwyIT09aS5sZW5ndGgpO289ITApO31jYXRjaChuKXt1PSEwLGU9bn1maW5hbGx5e3RyeXtvfHxudWxsPT1yLkF8fHIuQSgpfWZpbmFsbHl7aWYodSl0aHJvdyBlfX1yZXR1cm4gaX19KHIpfHxMayhyLDIpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIil9KCksZT10WzBdLGk9dFsxXTtyZXR1cm4gQXJyYXkoZSkuZmlsbChpLDAsZSl9KSkpfWZ1bmN0aW9uIEZrKG4pe3JldHVybiBuLnJlZHVjZSgoZnVuY3Rpb24obixyKXtyZXR1cm4gbi5jb25jYXQoQXJyYXkuaXNBcnJheShyKT9GayhyKTpyKX0pLFtdKX0oTWt8fF9rfHxJa3x8QWt8fGtrKSYmKE9rPWZ1bmN0aW9uKG4pe3ZhciByLHQsZSxpLG8sdSxmLGE9dGhpcyxjPW1rKGEpLHM9eWsobiksdj1jLnJhdztpZih2KXJldHVybiB2Lmxhc3RJbmRleD1hLmxhc3RJbmRleCxyPWxrKE9rLHYscyksYS5sYXN0SW5kZXg9di5sYXN0SW5kZXgscjt2YXIgaD1jLkpyLGw9SWsmJmEuc3RpY2t5LGQ9bGsod2ssYSkseT1hLnNvdXJjZSx3PTAsYj1zO2lmKGwmJihkPVJrKGQsInkiLCIiKSwtMT09PVRrKGQsImciKSYmKGQrPSJnIiksYj1VayhzLGEubGFzdEluZGV4KSxhLmxhc3RJbmRleD4wJiYoIWEubXVsdGlsaW5lfHxhLm11bHRpbGluZSYmIlxuIiE9PUVrKHMsYS5sYXN0SW5kZXgtMSkpJiYoeT0iKD86ICIreSsiKSIsYj0iICIrYix3KyspLHQ9UmVnRXhwKCJeKD86Iit5KyIpIixkKSksX2smJih0PVJlZ0V4cCgiXiIreSsiJCg/IVxccykiLGQpKSxNayYmKGU9YS5sYXN0SW5kZXgpLGk9bGsoamssbD90OmEsYiksbD9pPyhpLmlucHV0PVVrKGkuaW5wdXQsdyksaVswXT1VayhpWzBdLHcpLGkuaW5kZXg9YS5sYXN0SW5kZXgsYS5sYXN0SW5kZXgrPWlbMF0ubGVuZ3RoKTphLmxhc3RJbmRleD0wOk1rJiZpJiYoYS5sYXN0SW5kZXg9YS5nbG9iYWw/aS5pbmRleCtpWzBdLmxlbmd0aDplKSxfayYmaSYmaS5sZW5ndGg+MSYmbGsoU2ssaVswXSx0LChmdW5jdGlvbigpe2ZvcihvPTE7YXJndW1lbnRzLmxlbmd0aC0yPm87bysrKXZvaWQgMD09PWFyZ3VtZW50c1tvXSYmKGlbb109dm9pZCAwKX0pKSxpJiZoKWZvcihpLkpyPXU9Z2sobnVsbCksbz0wO288aC5sZW5ndGg7bysrKXVbKGY9aFtvXSlbMF1dPWlbZlsxXV07cmV0dXJuIGl9KSxMZSh7dGFyZ2V0OiJSZWdFeHAiLGNuOiEwLGZuOi8uLy5leGVjIT09T2t9LHtleGVjOk9rfSk7dmFyIE5rPShaQT1bMCwxLDIsM10pLmNvbmNhdC5hcHBseShaQSx4ayhDayhbWzIsNF0sWzIsNV0sWzQsNl0sWzQsN10sWzgsOF0sWzgsOV0sWzE2LDEwXSxbMTYsMTFdLFszMiwxMl0sWzMyLDEzXSxbNjQsMTRdLFs2NCwxNV0sWzIsMF0sWzEsMTZdLFsxLDE3XSxbMiwxOF0sWzIsMTldLFs0LDIwXSxbNCwyMV0sWzgsMjJdLFs4LDIzXSxbMTYsMjRdLFsxNiwyNV0sWzMyLDI2XSxbMzIsMjddLFs2NCwyOF0sWzY0LDI5XV0pKSk7ZnVuY3Rpb24gQmsoKXt2YXIgbj10aGlzO2Z1bmN0aW9uIHIobixyKXt2YXIgdD0wO2Rve3R8PTEmbixuPj4+PTEsdDw8PTF9d2hpbGUoLS1yPjApO3JldHVybiB0Pj4+MX1uLlhyPWZ1bmN0aW9uKHQpe3ZhciBlLGksbyx1PW4uUXIsZj1uLm50LlpyLGE9bi5udC5ydCxjPS0xO2Zvcih0LnR0PTAsdC5ldD01NzMsZT0wO2E+ZTtlKyspMCE9PXVbMiplXT8odC5pdFsrK3QudHRdPWM9ZSx0Lm90W2VdPTApOnVbMiplKzFdPTA7Zm9yKDsyPnQudHQ7KXVbMioobz10Lml0WysrdC50dF09Mj5jPysrYzowKV09MSx0Lm90W29dPTAsdC51dC0tLGYmJih0LmZ0LT1mWzIqbysxXSk7Zm9yKG4uYXQ9YyxlPU1hdGguZmxvb3IodC50dC8yKTtlPj0xO2UtLSl0LmN0KHUsZSk7bz1hO2Rve2U9dC5pdFsxXSx0Lml0WzFdPXQuaXRbdC50dC0tXSx0LmN0KHUsMSksaT10Lml0WzFdLHQuaXRbLS10LmV0XT1lLHQuaXRbLS10LmV0XT1pLHVbMipvXT11WzIqZV0rdVsyKmldLHQub3Rbb109TWF0aC5tYXgodC5vdFtlXSx0Lm90W2ldKSsxLHVbMiplKzFdPXVbMippKzFdPW8sdC5pdFsxXT1vKyssdC5jdCh1LDEpfXdoaWxlKHQudHQ+PTIpO3QuaXRbLS10LmV0XT10Lml0WzFdLGZ1bmN0aW9uKHIpe3ZhciB0LGUsaSxvLHUsZixhPW4uUXIsYz1uLm50LlpyLHM9bi5udC5zdCx2PW4ubnQudnQsaD1uLm50Lmh0LGw9MDtmb3Iobz0wOzE1Pj1vO28rKylyLmx0W29dPTA7Zm9yKGFbMipyLml0W3IuZXRdKzFdPTAsdD1yLmV0KzE7NTczPnQ7dCsrKShvPWFbMiphWzIqKGU9ci5pdFt0XSkrMV0rMV0rMSk+aCYmKG89aCxsKyspLGFbMiplKzFdPW8sZT5uLmF0fHwoci5sdFtvXSsrLHU9MCx2PmV8fCh1PXNbZS12XSksZj1hWzIqZV0sci51dCs9Zioobyt1KSxjJiYoci5mdCs9ZiooY1syKmUrMV0rdSkpKTtpZigwIT09bCl7ZG97Zm9yKG89aC0xOzA9PT1yLmx0W29dOylvLS07ci5sdFtvXS0tLHIubHRbbysxXSs9MixyLmx0W2hdLS0sbC09Mn13aGlsZShsPjApO2ZvcihvPWg7MCE9PW87by0tKWZvcihlPXIubHRbb107MCE9PWU7KShpPXIuaXRbLS10XSk+bi5hdHx8KGFbMippKzFdIT1vJiYoci51dCs9KG8tYVsyKmkrMV0pKmFbMippXSxhWzIqaSsxXT1vKSxlLS0pfX0odCksZnVuY3Rpb24obix0LGUpe3ZhciBpLG8sdSxmPVtdLGE9MDtmb3IoaT0xOzE1Pj1pO2krKylmW2ldPWE9YStlW2ktMV08PDE7Zm9yKG89MDt0Pj1vO28rKykwIT09KHU9blsyKm8rMV0pJiYoblsyKm9dPXIoZlt1XSsrLHUpKX0odSxuLmF0LHQubHQpfX1mdW5jdGlvbiBEayhuLHIsdCxlLGkpe3ZhciBvPXRoaXM7by5acj1uLG8uc3Q9cixvLnZ0PXQsby5ydD1lLG8uaHQ9aX1Cay5kdD0obms9WzAsMSwyLDMsNCw1LDYsN10pLmNvbmNhdC5hcHBseShuayx4ayhDayhbWzIsOF0sWzIsOV0sWzIsMTBdLFsyLDExXSxbNCwxMl0sWzQsMTNdLFs0LDE0XSxbNCwxNV0sWzgsMTZdLFs4LDE3XSxbOCwxOF0sWzgsMTldLFsxNiwyMF0sWzE2LDIxXSxbMTYsMjJdLFsxNiwyM10sWzMyLDI0XSxbMzIsMjVdLFszMiwyNl0sWzMxLDI3XSxbMSwyOF1dKSkpLEJrLnl0PVswLDEsMiwzLDQsNSw2LDcsOCwxMCwxMiwxNCwxNiwyMCwyNCwyOCwzMiw0MCw0OCw1Niw2NCw4MCw5NiwxMTIsMTI4LDE2MCwxOTIsMjI0LDBdLEJrLnd0PVswLDEsMiwzLDQsNiw4LDEyLDE2LDI0LDMyLDQ4LDY0LDk2LDEyOCwxOTIsMjU2LDM4NCw1MTIsNzY4LDEwMjQsMTUzNiwyMDQ4LDMwNzIsNDA5Niw2MTQ0LDgxOTIsMTIyODgsMTYzODQsMjQ1NzZdLEJrLmJ0PWZ1bmN0aW9uKG4pe3JldHVybiAyNTY+bj9Oa1tuXTpOa1syNTYrKG4+Pj43KV19LEJrLmd0PVswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDBdLEJrLkF0PVswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcsNyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLDEzXSxCay5rdD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN10sQmsuU3Q9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO3ZhciBHaz1DayhbWzE0NCw4XSxbMTEyLDldLFsyNCw3XSxbOCw4XV0pO0RrLmp0PUZrKFsxMiwxNDAsNzYsMjA0LDQ0LDE3MiwxMDgsMjM2LDI4LDE1Niw5MiwyMjAsNjAsMTg4LDEyNCwyNTIsMiwxMzAsNjYsMTk0LDM0LDE2Miw5OCwyMjYsMTgsMTQ2LDgyLDIxMCw1MCwxNzgsMTE0LDI0MiwxMCwxMzgsNzQsMjAyLDQyLDE3MCwxMDYsMjM0LDI2LDE1NCw5MCwyMTgsNTgsMTg2LDEyMiwyNTAsNiwxMzQsNzAsMTk4LDM4LDE2NiwxMDIsMjMwLDIyLDE1MCw4NiwyMTQsNTQsMTgyLDExOCwyNDYsMTQsMTQyLDc4LDIwNiw0NiwxNzQsMTEwLDIzOCwzMCwxNTgsOTQsMjIyLDYyLDE5MCwxMjYsMjU0LDEsMTI5LDY1LDE5MywzMywxNjEsOTcsMjI1LDE3LDE0NSw4MSwyMDksNDksMTc3LDExMywyNDEsOSwxMzcsNzMsMjAxLDQxLDE2OSwxMDUsMjMzLDI1LDE1Myw4OSwyMTcsNTcsMTg1LDEyMSwyNDksNSwxMzMsNjksMTk3LDM3LDE2NSwxMDEsMjI5LDIxLDE0OSw4NSwyMTMsNTMsMTgxLDExNywyNDUsMTMsMTQxLDc3LDIwNSw0NSwxNzMsMTA5LDIzNywyOSwxNTcsOTMsMjIxLDYxLDE4OSwxMjUsMjUzLDE5LDI3NSwxNDcsNDAzLDgzLDMzOSwyMTEsNDY3LDUxLDMwNywxNzksNDM1LDExNSwzNzEsMjQzLDQ5OSwxMSwyNjcsMTM5LDM5NSw3NSwzMzEsMjAzLDQ1OSw0MywyOTksMTcxLDQyNywxMDcsMzYzLDIzNSw0OTEsMjcsMjgzLDE1NSw0MTEsOTEsMzQ3LDIxOSw0NzUsNTksMzE1LDE4Nyw0NDMsMTIzLDM3OSwyNTEsNTA3LDcsMjYzLDEzNSwzOTEsNzEsMzI3LDE5OSw0NTUsMzksMjk1LDE2Nyw0MjMsMTAzLDM1OSwyMzEsNDg3LDIzLDI3OSwxNTEsNDA3LDg3LDM0MywyMTUsNDcxLDU1LDMxMSwxODMsNDM5LDExOSwzNzUsMjQ3LDUwMywxNSwyNzEsMTQzLDM5OSw3OSwzMzUsMjA3LDQ2Myw0NywzMDMsMTc1LDQzMSwxMTEsMzY3LDIzOSw0OTUsMzEsMjg3LDE1OSw0MTUsOTUsMzUxLDIyMyw0NzksNjMsMzE5LDE5MSw0NDcsMTI3LDM4MywyNTUsNTExLDAsNjQsMzIsOTYsMTYsODAsNDgsMTEyLDgsNzIsNDAsMTA0LDI0LDg4LDU2LDEyMCw0LDY4LDM2LDEwMCwyMCw4NCw1MiwxMTYsMywxMzEsNjcsMTk1LDM1LDE2Myw5OSwyMjddLm1hcCgoZnVuY3Rpb24obixyKXtyZXR1cm5bbixHa1tyXV19KSkpO3ZhciBWaz1DayhbWzMwLDVdXSk7ZnVuY3Rpb24gWWsobixyLHQsZSxpKXt2YXIgbz10aGlzO28uT3Q9bixvLkV0PXIsby5UdD10LG8uUnQ9ZSxvLlV0PWl9RGsuTXQ9RmsoWzAsMTYsOCwyNCw0LDIwLDEyLDI4LDIsMTgsMTAsMjYsNiwyMiwxNCwzMCwxLDE3LDksMjUsNSwyMSwxMywyOSwzLDE5LDExLDI3LDcsMjNdLm1hcCgoZnVuY3Rpb24obixyKXtyZXR1cm5bbixWa1tyXV19KSkpLERrLkl0PW5ldyBEayhEay5qdCxCay5ndCwyNTcsMjg2LDE1KSxEay5fdD1uZXcgRGsoRGsuTXQsQmsuQXQsMCwzMCwxNSksRGsueHQ9bmV3IERrKG51bGwsQmsua3QsMCwxOSw3KTt2YXIgems9W25ldyBZaygwLDAsMCwwLDApLG5ldyBZayg0LDQsOCw0LDEpLG5ldyBZayg0LDUsMTYsOCwxKSxuZXcgWWsoNCw2LDMyLDMyLDEpLG5ldyBZayg0LDQsMTYsMTYsMiksbmV3IFlrKDgsMTYsMzIsMzIsMiksbmV3IFlrKDgsMTYsMTI4LDEyOCwyKSxuZXcgWWsoOCwzMiwxMjgsMjU2LDIpLG5ldyBZaygzMiwxMjgsMjU4LDEwMjQsMiksbmV3IFlrKDMyLDI1OCwyNTgsNDA5NiwyKV0sV2s9WyJuZWVkIGRpY3Rpb25hcnkiLCJzdHJlYW0gZW5kIiwiIiwiIiwic3RyZWFtIGVycm9yIiwiZGF0YSBlcnJvciIsIiIsImJ1ZmZlciBlcnJvciIsIiIsIiJdO2Z1bmN0aW9uIEhrKG4scix0LGUpe3ZhciBpPW5bMipyXSxvPW5bMip0XTtyZXR1cm4gbz5pfHxpPT1vJiZlW3JdPD1lW3RdfWZ1bmN0aW9uICRrKCl7dmFyIG4scix0LGUsaSxvLHUsZixhLGMscyx2LGgsbCxkLHksdyxiLHAsZyxtLEEsayxTLGosTyxFLFQsUixVLE0sSSxfLHgsTCxQLEMsRixOLEI9dGhpcyxEPW5ldyBCayxHPW5ldyBCayxWPW5ldyBCaztmdW5jdGlvbiBZKCl7dmFyIG47Zm9yKG49MDsyODY+bjtuKyspTVsyKm5dPTA7Zm9yKG49MDszMD5uO24rKylJWzIqbl09MDtmb3Iobj0wOzE5Pm47bisrKV9bMipuXT0wO01bNTEyXT0xLEIudXQ9Qi5mdD0wLEw9UD0wfWZ1bmN0aW9uIHoobixyKXt2YXIgdCxlPS0xLGk9blsxXSxvPTAsdT03LGY9NDswPT09aSYmKHU9MTM4LGY9MyksblsyKihyKzEpKzFdPTY1NTM1O2Zvcih2YXIgYT0wO3I+PWE7YSsrKXQ9aSxpPW5bMiooYSsxKSsxXSwrK288dSYmdD09aXx8KGY+bz9fWzIqdF0rPW86MCE9PXQ/KHQhPWUmJl9bMip0XSsrLF9bMzJdKyspOm8+MTA/X1szNl0rKzpfWzM0XSsrLG89MCxlPXQsMD09PWk/KHU9MTM4LGY9Myk6dD09aT8odT02LGY9Myk6KHU9NyxmPTQpKX1mdW5jdGlvbiBXKG4pe0IuTHRbQi5wZW5kaW5nKytdPW59ZnVuY3Rpb24gSChuKXtXKDI1NSZuKSxXKG4+Pj44JjI1NSl9ZnVuY3Rpb24gJChuLHIpe3ZhciB0LGU9cjtOPjE2LWU/KEgoRnw9KHQ9bik8PE4mNjU1MzUpLEY9dD4+PjE2LU4sTis9ZS0xNik6KEZ8PW48PE4mNjU1MzUsTis9ZSl9ZnVuY3Rpb24gSyhuLHIpe3ZhciB0PTIqbjskKDY1NTM1JnJbdF0sNjU1MzUmclt0KzFdKX1mdW5jdGlvbiBxKG4scil7dmFyIHQsZSxpPS0xLG89blsxXSx1PTAsZj03LGE9NDtmb3IoMD09PW8mJihmPTEzOCxhPTMpLHQ9MDtyPj10O3QrKylpZihlPW8sbz1uWzIqKHQrMSkrMV0sKyt1Pj1mfHxlIT1vKXtpZihhPnUpZG97SyhlLF8pfXdoaWxlKDAhPS0tdSk7ZWxzZSAwIT09ZT8oZSE9aSYmKEsoZSxfKSx1LS0pLEsoMTYsXyksJCh1LTMsMikpOnU+MTA/KEsoMTgsXyksJCh1LTExLDcpKTooSygxNyxfKSwkKHUtMywzKSk7dT0wLGk9ZSwwPT09bz8oZj0xMzgsYT0zKTplPT1vPyhmPTYsYT0zKTooZj03LGE9NCl9fWZ1bmN0aW9uIEooKXsxNj09Tj8oSChGKSxGPTAsTj0wKTo4Pk58fChXKDI1NSZGKSxGPj4+PTgsTi09OCl9ZnVuY3Rpb24gWChuLHIpe3ZhciB0LGUsaTtpZihCLlB0W0xdPW4sQi5DdFtMXT0yNTUmcixMKyssMD09PW4/TVsyKnJdKys6KFArKyxuLS0sTVsyKihCay5kdFtyXSsyNTYrMSldKyssSVsyKkJrLmJ0KG4pXSsrKSwwPT0oODE5MSZMKSYmRT4yKXtmb3IodD04KkwsZT1tLXcsaT0wOzMwPmk7aSsrKXQrPUlbMippXSooNStCay5BdFtpXSk7aWYodD4+Pj0zLE1hdGguZmxvb3IoTC8yKT5QJiZNYXRoLmZsb29yKGUvMik+dClyZXR1cm4hMH1yZXR1cm4gTD09eC0xfWZ1bmN0aW9uIFEobixyKXt2YXIgdCxlLGksbyx1PTA7aWYoMCE9PUwpZG97dD1CLlB0W3VdLGU9Qi5DdFt1XSx1KyssMD09PXQ/SyhlLG4pOihLKChpPUJrLmR0W2VdKSsyNTYrMSxuKSwwIT09KG89QmsuZ3RbaV0pJiYkKGUtPUJrLnl0W2ldLG8pLHQtLSxLKGk9QmsuYnQodCksciksMCE9PShvPUJrLkF0W2ldKSYmJCh0LT1Cay53dFtpXSxvKSl9d2hpbGUoTD51KTtLKDI1NixuKSxDPW5bNTEzXX1mdW5jdGlvbiBaKCl7Tj44P0goRik6Tj4wJiZXKDI1NSZGKSxGPTAsTj0wfWZ1bmN0aW9uIG5uKG4scix0KXskKDArKHQ/MTowKSwzKSxmdW5jdGlvbihuLHIpe1ooKSxDPTgsSChyKSxIKH5yKSxCLkx0LnNldChmLnN1YmFycmF5KG4sbityKSxCLnBlbmRpbmcpLEIucGVuZGluZys9cn0obixyKX1mdW5jdGlvbiBybihyKXsoZnVuY3Rpb24obixyLHQpe3ZhciBlLGksbz0wO0U+MD8oRC5YcihCKSxHLlhyKEIpLG89ZnVuY3Rpb24oKXt2YXIgbjtmb3IoeihNLEQuYXQpLHooSSxHLmF0KSxWLlhyKEIpLG49MTg7bj49MyYmMD09PV9bMipCay5TdFtuXSsxXTtuLS0pO3JldHVybiBCLnV0Kz0xNCszKihuKzEpLG59KCksZT1CLnV0KzMrNz4+PjMsKGk9Qi5mdCszKzc+Pj4zKT5lfHwoZT1pKSk6ZT1pPXIrNSxyKzQ+ZXx8LTE9PW4/aT09ZT8oJCgyKyh0PzE6MCksMyksUShEay5qdCxEay5NdCkpOigkKDQrKHQ/MTowKSwzKSxmdW5jdGlvbihuLHIsdCl7dmFyIGU7Zm9yKCQobi0yNTcsNSksJChyLTEsNSksJCh0LTQsNCksZT0wO3Q+ZTtlKyspJChfWzIqQmsuU3RbZV0rMV0sMyk7cShNLG4tMSkscShJLHItMSl9KEQuYXQrMSxHLmF0KzEsbysxKSxRKE0sSSkpOm5uKG4scix0KSxZKCksdCYmWigpfSkoMD53Py0xOncsbS13LHIpLHc9bSxuLkZ0KCl9ZnVuY3Rpb24gdG4oKXt2YXIgcix0LGUsbztkb3tpZigwPT0obz1hLWstbSkmJjA9PT1tJiYwPT09aylvPWk7ZWxzZSBpZigtMT09bylvLS07ZWxzZSBpZihtPj1pK2ktMjYyKXtmLnNldChmLnN1YmFycmF5KGksaStpKSwwKSxBLT1pLG0tPWksdy09aSxlPXI9aDtkb3t0PTY1NTM1JnNbLS1lXSxzW2VdPWk+dD8wOnQtaX13aGlsZSgwIT0tLXIpO2U9cj1pO2Rve3Q9NjU1MzUmY1stLWVdLGNbZV09aT50PzA6dC1pfXdoaWxlKDAhPS0tcik7bys9aX1pZigwPT09bi5OdClyZXR1cm47cj1uLkJ0KGYsbStrLG8pLDM+KGsrPXIpfHwodj0oKHY9MjU1JmZbbV0pPDx5XjI1NSZmW20rMV0pJmQpfXdoaWxlKDI2Mj5rJiYwIT09bi5OdCl9ZnVuY3Rpb24gZW4obil7dmFyIHIsdCxlPWosbz1tLGE9UyxzPW0+aS0yNjI/bS0oaS0yNjIpOjAsdj1VLGg9dSxsPW0rMjU4LGQ9ZltvK2EtMV0seT1mW28rYV07Uj5TfHwoZT4+PTIpLHY+ayYmKHY9ayk7ZG97aWYoZlsocj1uKSthXT09eSYmZltyK2EtMV09PWQmJmZbcl09PWZbb10mJmZbKytyXT09ZltvKzFdKXtvKz0yLHIrKztkb3t9d2hpbGUoZlsrK29dPT1mWysrcl0mJmZbKytvXT09ZlsrK3JdJiZmWysrb109PWZbKytyXSYmZlsrK29dPT1mWysrcl0mJmZbKytvXT09ZlsrK3JdJiZmWysrb109PWZbKytyXSYmZlsrK29dPT1mWysrcl0mJmZbKytvXT09ZlsrK3JdJiZsPm8pO2lmKHQ9MjU4LShsLW8pLG89bC0yNTgsdD5hKXtpZihBPW4sYT10LHQ+PXYpYnJlYWs7ZD1mW28rYS0xXSx5PWZbbythXX19fXdoaWxlKChuPTY1NTM1JmNbbiZoXSk+cyYmMCE9LS1lKTtyZXR1cm4gYT5rP2s6YX1CLm90PVtdLEIubHQ9W10sQi5pdD1bXSxNPVtdLEk9W10sXz1bXSxCLmN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PUIuaXQsZT10W3JdLGk9cjw8MTtpPD1CLnR0JiYoaTxCLnR0JiZIayhuLHRbaSsxXSx0W2ldLEIub3QpJiZpKyssIUhrKG4sZSx0W2ldLEIub3QpKTspdFtyXT10W2ldLHI9aSxpPDw9MTt0W3JdPWV9LEIuRHQ9ZnVuY3Rpb24obixwLEEsTCxQLHope3JldHVybiBMfHwoTD04KSxQfHwoUD04KSx6fHwoej0wKSxuLkd0PW51bGwsLTE9PXAmJihwPTYpLDE+UHx8UD45fHw4IT1MfHw5PkF8fEE+MTV8fDA+cHx8cD45fHwwPnp8fHo+Mj8tMjoobi5WdD1CLHU9KGk9MTw8KG89QSkpLTEsZD0oaD0xPDwobD1QKzcpKS0xLHk9TWF0aC5mbG9vcigobCszLTEpLzMpLGY9bmV3IFVpbnQ4QXJyYXkoMippKSxjPVtdLHM9W10seD0xPDxQKzYsQi5MdD1uZXcgVWludDhBcnJheSg0KngpLHQ9NCp4LEIuUHQ9bmV3IFVpbnQxNkFycmF5KHgpLEIuQ3Q9bmV3IFVpbnQ4QXJyYXkoeCksRT1wLFQ9eixmdW5jdGlvbihuKXtyZXR1cm4gbi5ZdD1uLnp0PTAsbi5HdD1udWxsLEIucGVuZGluZz0wLEIuV3Q9MCxyPTExMyxlPTAsRC5Rcj1NLEQubnQ9RGsuSXQsRy5Rcj1JLEcubnQ9RGsuX3QsVi5Rcj1fLFYubnQ9RGsueHQsRj0wLE49MCxDPTgsWSgpLGZ1bmN0aW9uKCl7YT0yKmksc1toLTFdPTA7Zm9yKHZhciBuPTA7aC0xPm47bisrKXNbbl09MDtPPXprW0VdLkV0LFI9emtbRV0uT3QsVT16a1tFXS5UdCxqPXprW0VdLlJ0LG09MCx3PTAsaz0wLGI9Uz0yLGc9MCx2PTB9KCksMH0obikpfSxCLkh0PWZ1bmN0aW9uKCl7cmV0dXJuIDQyIT1yJiYxMTMhPXImJjY2NiE9cj8tMjooQi5DdD1udWxsLEIuUHQ9bnVsbCxCLkx0PW51bGwscz1udWxsLGM9bnVsbCxmPW51bGwsQi5WdD1udWxsLDExMz09cj8tMzowKX0sQi4kdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9MDtyZXR1cm4tMT09ciYmKHI9NiksMD5yfHxyPjl8fDA+dHx8dD4yPy0yOih6a1tFXS5VdCE9emtbcl0uVXQmJjAhPT1uLll0JiYoZT1uLkdyKDEpKSxFIT1yJiYoTz16a1tFPXJdLkV0LFI9emtbRV0uT3QsVT16a1tFXS5UdCxqPXprW0VdLlJ0KSxUPXQsZSl9LEIuS3Q9ZnVuY3Rpb24obix0LGUpe3ZhciBvLGE9ZSxoPTA7aWYoIXR8fDQyIT1yKXJldHVybi0yO2lmKDM+YSlyZXR1cm4gMDtmb3IoYT5pLTI2MiYmKGg9ZS0oYT1pLTI2MikpLGYuc2V0KHQuc3ViYXJyYXkoaCxoK2EpLDApLG09YSx3PWEsdj0oKHY9MjU1JmZbMF0pPDx5XjI1NSZmWzFdKSZkLG89MDthLTM+PW87bysrKXY9KHY8PHleMjU1JmZbbysyXSkmZCxjW28mdV09c1t2XSxzW3ZdPW87cmV0dXJuIDB9LEIuR3I9ZnVuY3Rpb24oYSxsKXt2YXIgaixSLFUsTSxJLF87aWYobD40fHwwPmwpcmV0dXJuLTI7aWYoIWEucXR8fCFhLkp0JiYwIT09YS5OdHx8NjY2PT1yJiY0IT1sKXJldHVybiBhLkd0PVdrWzRdLC0yO2lmKDA9PT1hLlh0KXJldHVybiBhLkd0PVdrWzddLC01O2lmKG49YSxNPWUsZT1sLDQyPT1yJiYoUj04KyhvLTg8PDQpPDw4LChVPShFLTEmMjU1KT4+MSk+MyYmKFU9MyksUnw9VTw8NiwwIT09bSYmKFJ8PTMyKSxyPTExMyxXKChfPVIrPTMxLVIlMzEpPj44JjI1NSksVygyNTUmXykpLDAhPT1CLnBlbmRpbmcpe2lmKG4uRnQoKSwwPT09bi5YdClyZXR1cm4gZT0tMSwwfWVsc2UgaWYoMD09PW4uTnQmJk0+PWwmJjQhPWwpcmV0dXJuIG4uR3Q9V2tbN10sLTU7aWYoNjY2PT1yJiYwIT09bi5OdClyZXR1cm4gYS5HdD1Xa1s3XSwtNTtpZigwIT09bi5OdHx8MCE9PWt8fDAhPWwmJjY2NiE9cil7c3dpdGNoKEk9LTEsemtbRV0uVXQpe2Nhc2UgMDpJPWZ1bmN0aW9uKHIpe3ZhciBlLG89NjU1MzU7Zm9yKG8+dC01JiYobz10LTUpOzspe2lmKDE+PWspe2lmKHRuKCksMD09PWsmJjA9PXIpcmV0dXJuIDA7aWYoMD09PWspYnJlYWt9aWYobSs9ayxrPTAsZT13K28sKDA9PT1tfHxtPj1lKSYmKGs9bS1lLG09ZSxybighMSksMD09PW4uWHQpKXJldHVybiAwO2lmKG0tdz49aS0yNjImJihybighMSksMD09PW4uWHQpKXJldHVybiAwfXJldHVybiBybig0PT1yKSwwPT09bi5YdD80PT1yPzI6MDo0PT1yPzM6MX0obCk7YnJlYWs7Y2FzZSAxOkk9ZnVuY3Rpb24ocil7Zm9yKHZhciB0LGU9MDs7KXtpZigyNjI+ayl7aWYodG4oKSwyNjI+ayYmMD09cilyZXR1cm4gMDtpZigwPT09aylicmVha31pZigzPmt8fCh2PSh2PDx5XjI1NSZmW20rMl0pJmQsZT02NTUzNSZzW3ZdLGNbbSZ1XT1zW3ZdLHNbdl09bSksMD09PWV8fChtLWUmNjU1MzUpPmktMjYyfHwyIT1UJiYoYj1lbihlKSksMz5iKXQ9WCgwLDI1NSZmW21dKSxrLS0sbSsrO2Vsc2UgaWYodD1YKG0tQSxiLTMpLGstPWIsYj5PfHwzPmspbSs9YixiPTAsdj0oKHY9MjU1JmZbbV0pPDx5XjI1NSZmW20rMV0pJmQ7ZWxzZXtiLS07ZG97bSsrLHY9KHY8PHleMjU1JmZbbSsyXSkmZCxlPTY1NTM1JnNbdl0sY1ttJnVdPXNbdl0sc1t2XT1tfXdoaWxlKDAhPS0tYik7bSsrfWlmKHQmJihybighMSksMD09PW4uWHQpKXJldHVybiAwfXJldHVybiBybig0PT1yKSwwPT09bi5YdD80PT1yPzI6MDo0PT1yPzM6MX0obCk7YnJlYWs7Y2FzZSAyOkk9ZnVuY3Rpb24ocil7Zm9yKHZhciB0LGUsbz0wOzspe2lmKDI2Mj5rKXtpZih0bigpLDI2Mj5rJiYwPT1yKXJldHVybiAwO2lmKDA9PT1rKWJyZWFrfWlmKDM+a3x8KHY9KHY8PHleMjU1JmZbbSsyXSkmZCxvPTY1NTM1JnNbdl0sY1ttJnVdPXNbdl0sc1t2XT1tKSxTPWIscD1BLGI9MiwwIT09byYmTz5TJiZpLTI2Mj49KG0tbyY2NTUzNSkmJigyIT1UJiYoYj1lbihvKSksNT49YiYmKDE9PVR8fDM9PWImJm0tQT40MDk2KSYmKGI9MikpLDM+U3x8Yj5TKWlmKDAhPT1nKXtpZigodD1YKDAsMjU1JmZbbS0xXSkpJiZybighMSksbSsrLGstLSwwPT09bi5YdClyZXR1cm4gMH1lbHNlIGc9MSxtKyssay0tO2Vsc2V7ZT1tK2stMyx0PVgobS0xLXAsUy0zKSxrLT1TLTEsUy09Mjtkb3srK20+ZXx8KHY9KHY8PHleMjU1JmZbbSsyXSkmZCxvPTY1NTM1JnNbdl0sY1ttJnVdPXNbdl0sc1t2XT1tKX13aGlsZSgwIT0tLVMpO2lmKGc9MCxiPTIsbSsrLHQmJihybighMSksMD09PW4uWHQpKXJldHVybiAwfX1yZXR1cm4gMCE9PWcmJih0PVgoMCwyNTUmZlttLTFdKSxnPTApLHJuKDQ9PXIpLDA9PT1uLlh0PzQ9PXI/MjowOjQ9PXI/MzoxfShsKX1pZigyIT1JJiYzIT1JfHwocj02NjYpLDA9PUl8fDI9PUkpcmV0dXJuIDA9PT1uLlh0JiYoZT0tMSksMDtpZigxPT1JKXtpZigxPT1sKSQoMiwzKSxLKDI1NixEay5qdCksSigpLDk+MStDKzEwLU4mJigkKDIsMyksSygyNTYsRGsuanQpLEooKSksQz03O2Vsc2UgaWYobm4oMCwwLCExKSwzPT1sKWZvcihqPTA7aD5qO2orKylzW2pdPTA7aWYobi5GdCgpLDA9PT1uLlh0KXJldHVybiBlPS0xLDB9fXJldHVybiA0IT1sPzA6MX19ZnVuY3Rpb24gS2soKXt2YXIgbj10aGlzO24uUXQ9MCxuLlp0PTAsbi5OdD0wLG4uWXQ9MCxuLlh0PTAsbi56dD0wfWZ1bmN0aW9uIHFrKG4pe3ZhciByLHQ9bmV3IEtrLGU9KHI9biYmbi5Gcj9uLkZyOjY1NTM2KSs1KihNYXRoLmZsb29yKHIvMTYzODMpKzEpLGk9bmV3IFVpbnQ4QXJyYXkoZSksbz1uP24ubGV2ZWw6LTE7dm9pZCAwPT09byYmKG89LTEpLHQuRHQobyksdC5xdD1pLHRoaXMuYXBwZW5kPWZ1bmN0aW9uKG4scil7dmFyIG8sdT0wLGY9MCxhPTAsYz1bXTtpZihuLmxlbmd0aCl7dC5RdD0wLHQuSnQ9bix0Lk50PW4ubGVuZ3RoO2Rve2lmKHQuWnQ9MCx0Llh0PWUsMCE9dC5HcigwKSl0aHJvdyBFcnJvcigiZGVmbGF0aW5nOiAiK3QuR3QpO3QuWnQmJih0Llp0PT1lP2MucHVzaChuZXcgVWludDhBcnJheShpKSk6Yy5wdXNoKGkuc2xpY2UoMCx0Llp0KSkpLGErPXQuWnQsciYmdC5RdD4wJiZ0LlF0IT11JiYocih0LlF0KSx1PXQuUXQpfXdoaWxlKHQuTnQ+MHx8MD09PXQuWHQpO3JldHVybiBjLmxlbmd0aD4xPyhvPW5ldyBVaW50OEFycmF5KGEpLGMuZm9yRWFjaCgoZnVuY3Rpb24obil7by5zZXQobixmKSxmKz1uLmxlbmd0aH0pKSk6bz1jWzBdfHxuZXcgVWludDhBcnJheSgwKSxvfX0sdGhpcy5mbHVzaD1mdW5jdGlvbigpe3ZhciBuLHIsbz0wLHU9MCxmPVtdO2Rve2lmKHQuWnQ9MCx0Llh0PWUsMSE9KG49dC5Hcig0KSkmJjAhPW4pdGhyb3cgRXJyb3IoImRlZmxhdGluZzogIit0Lkd0KTtlLXQuWHQ+MCYmZi5wdXNoKGkuc2xpY2UoMCx0Llp0KSksdSs9dC5adH13aGlsZSh0Lk50PjB8fDA9PT10Llh0KTtyZXR1cm4gdC5IdCgpLHI9bmV3IFVpbnQ4QXJyYXkodSksZi5mb3JFYWNoKChmdW5jdGlvbihuKXtyLnNldChuLG8pLG8rPW4ubGVuZ3RofSkpLHJ9fUtrLnByb3RvdHlwZT17RHQ6ZnVuY3Rpb24obixyKXt2YXIgdD10aGlzO3JldHVybiB0LlZ0PW5ldyAkayxyfHwocj0xNSksdC5WdC5EdCh0LG4scil9LEdyOmZ1bmN0aW9uKG4pe3ZhciByPXRoaXM7cmV0dXJuIHIuVnQ/ci5WdC5HcihyLG4pOi0yfSxIdDpmdW5jdGlvbigpe3ZhciBuPXRoaXM7aWYoIW4uVnQpcmV0dXJuLTI7dmFyIHI9bi5WdC5IdCgpO3JldHVybiBuLlZ0PW51bGwscn0sJHQ6ZnVuY3Rpb24obixyKXt2YXIgdD10aGlzO3JldHVybiB0LlZ0P3QuVnQuJHQodCxuLHIpOi0yfSxLdDpmdW5jdGlvbihuLHIpe3ZhciB0PXRoaXM7cmV0dXJuIHQuVnQ/dC5WdC5LdCh0LG4scik6LTJ9LEJ0OmZ1bmN0aW9uKG4scix0KXt2YXIgZT10aGlzLGk9ZS5OdDtyZXR1cm4gaT50JiYoaT10KSwwPT09aT8wOihlLk50LT1pLG4uc2V0KGUuSnQuc3ViYXJyYXkoZS5RdCxlLlF0K2kpLHIpLGUuUXQrPWksZS5ZdCs9aSxpKX0sRnQ6ZnVuY3Rpb24oKXt2YXIgbj10aGlzLHI9bi5WdC5wZW5kaW5nO3I+bi5YdCYmKHI9bi5YdCksMCE9PXImJihuLnF0LnNldChuLlZ0Lkx0LnN1YmFycmF5KG4uVnQuV3Qsbi5WdC5XdCtyKSxuLlp0KSxuLlp0Kz1yLG4uVnQuV3QrPXIsbi56dCs9cixuLlh0LT1yLG4uVnQucGVuZGluZy09ciwwPT09bi5WdC5wZW5kaW5nJiYobi5WdC5XdD0wKSl9fSwoMCxkYS5leHBvcnRzKSgiSW50MzIiLChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24ocix0LGUpe3JldHVybiBuKHRoaXMscix0LGUpfX0pKTt2YXIgSms9WzAsMSwzLDcsMTUsMzEsNjMsMTI3LDI1NSw1MTEsMTAyMywyMDQ3LDQwOTUsODE5MSwxNjM4MywzMjc2Nyw2NTUzNV0sWGs9Wzk2LDcsMjU2LDAsOCw4MCwwLDgsMTYsODQsOCwxMTUsODIsNywzMSwwLDgsMTEyLDAsOCw0OCwwLDksMTkyLDgwLDcsMTAsMCw4LDk2LDAsOCwzMiwwLDksMTYwLDAsOCwwLDAsOCwxMjgsMCw4LDY0LDAsOSwyMjQsODAsNyw2LDAsOCw4OCwwLDgsMjQsMCw5LDE0NCw4Myw3LDU5LDAsOCwxMjAsMCw4LDU2LDAsOSwyMDgsODEsNywxNywwLDgsMTA0LDAsOCw0MCwwLDksMTc2LDAsOCw4LDAsOCwxMzYsMCw4LDcyLDAsOSwyNDAsODAsNyw0LDAsOCw4NCwwLDgsMjAsODUsOCwyMjcsODMsNyw0MywwLDgsMTE2LDAsOCw1MiwwLDksMjAwLDgxLDcsMTMsMCw4LDEwMCwwLDgsMzYsMCw5LDE2OCwwLDgsNCwwLDgsMTMyLDAsOCw2OCwwLDksMjMyLDgwLDcsOCwwLDgsOTIsMCw4LDI4LDAsOSwxNTIsODQsNyw4MywwLDgsMTI0LDAsOCw2MCwwLDksMjE2LDgyLDcsMjMsMCw4LDEwOCwwLDgsNDQsMCw5LDE4NCwwLDgsMTIsMCw4LDE0MCwwLDgsNzYsMCw5LDI0OCw4MCw3LDMsMCw4LDgyLDAsOCwxOCw4NSw4LDE2Myw4Myw3LDM1LDAsOCwxMTQsMCw4LDUwLDAsOSwxOTYsODEsNywxMSwwLDgsOTgsMCw4LDM0LDAsOSwxNjQsMCw4LDIsMCw4LDEzMCwwLDgsNjYsMCw5LDIyOCw4MCw3LDcsMCw4LDkwLDAsOCwyNiwwLDksMTQ4LDg0LDcsNjcsMCw4LDEyMiwwLDgsNTgsMCw5LDIxMiw4Miw3LDE5LDAsOCwxMDYsMCw4LDQyLDAsOSwxODAsMCw4LDEwLDAsOCwxMzgsMCw4LDc0LDAsOSwyNDQsODAsNyw1LDAsOCw4NiwwLDgsMjIsMTkyLDgsMCw4Myw3LDUxLDAsOCwxMTgsMCw4LDU0LDAsOSwyMDQsODEsNywxNSwwLDgsMTAyLDAsOCwzOCwwLDksMTcyLDAsOCw2LDAsOCwxMzQsMCw4LDcwLDAsOSwyMzYsODAsNyw5LDAsOCw5NCwwLDgsMzAsMCw5LDE1Niw4NCw3LDk5LDAsOCwxMjYsMCw4LDYyLDAsOSwyMjAsODIsNywyNywwLDgsMTEwLDAsOCw0NiwwLDksMTg4LDAsOCwxNCwwLDgsMTQyLDAsOCw3OCwwLDksMjUyLDk2LDcsMjU2LDAsOCw4MSwwLDgsMTcsODUsOCwxMzEsODIsNywzMSwwLDgsMTEzLDAsOCw0OSwwLDksMTk0LDgwLDcsMTAsMCw4LDk3LDAsOCwzMywwLDksMTYyLDAsOCwxLDAsOCwxMjksMCw4LDY1LDAsOSwyMjYsODAsNyw2LDAsOCw4OSwwLDgsMjUsMCw5LDE0Niw4Myw3LDU5LDAsOCwxMjEsMCw4LDU3LDAsOSwyMTAsODEsNywxNywwLDgsMTA1LDAsOCw0MSwwLDksMTc4LDAsOCw5LDAsOCwxMzcsMCw4LDczLDAsOSwyNDIsODAsNyw0LDAsOCw4NSwwLDgsMjEsODAsOCwyNTgsODMsNyw0MywwLDgsMTE3LDAsOCw1MywwLDksMjAyLDgxLDcsMTMsMCw4LDEwMSwwLDgsMzcsMCw5LDE3MCwwLDgsNSwwLDgsMTMzLDAsOCw2OSwwLDksMjM0LDgwLDcsOCwwLDgsOTMsMCw4LDI5LDAsOSwxNTQsODQsNyw4MywwLDgsMTI1LDAsOCw2MSwwLDksMjE4LDgyLDcsMjMsMCw4LDEwOSwwLDgsNDUsMCw5LDE4NiwwLDgsMTMsMCw4LDE0MSwwLDgsNzcsMCw5LDI1MCw4MCw3LDMsMCw4LDgzLDAsOCwxOSw4NSw4LDE5NSw4Myw3LDM1LDAsOCwxMTUsMCw4LDUxLDAsOSwxOTgsODEsNywxMSwwLDgsOTksMCw4LDM1LDAsOSwxNjYsMCw4LDMsMCw4LDEzMSwwLDgsNjcsMCw5LDIzMCw4MCw3LDcsMCw4LDkxLDAsOCwyNywwLDksMTUwLDg0LDcsNjcsMCw4LDEyMywwLDgsNTksMCw5LDIxNCw4Miw3LDE5LDAsOCwxMDcsMCw4LDQzLDAsOSwxODIsMCw4LDExLDAsOCwxMzksMCw4LDc1LDAsOSwyNDYsODAsNyw1LDAsOCw4NywwLDgsMjMsMTkyLDgsMCw4Myw3LDUxLDAsOCwxMTksMCw4LDU1LDAsOSwyMDYsODEsNywxNSwwLDgsMTAzLDAsOCwzOSwwLDksMTc0LDAsOCw3LDAsOCwxMzUsMCw4LDcxLDAsOSwyMzgsODAsNyw5LDAsOCw5NSwwLDgsMzEsMCw5LDE1OCw4NCw3LDk5LDAsOCwxMjcsMCw4LDYzLDAsOSwyMjIsODIsNywyNywwLDgsMTExLDAsOCw0NywwLDksMTkwLDAsOCwxNSwwLDgsMTQzLDAsOCw3OSwwLDksMjU0LDk2LDcsMjU2LDAsOCw4MCwwLDgsMTYsODQsOCwxMTUsODIsNywzMSwwLDgsMTEyLDAsOCw0OCwwLDksMTkzLDgwLDcsMTAsMCw4LDk2LDAsOCwzMiwwLDksMTYxLDAsOCwwLDAsOCwxMjgsMCw4LDY0LDAsOSwyMjUsODAsNyw2LDAsOCw4OCwwLDgsMjQsMCw5LDE0NSw4Myw3LDU5LDAsOCwxMjAsMCw4LDU2LDAsOSwyMDksODEsNywxNywwLDgsMTA0LDAsOCw0MCwwLDksMTc3LDAsOCw4LDAsOCwxMzYsMCw4LDcyLDAsOSwyNDEsODAsNyw0LDAsOCw4NCwwLDgsMjAsODUsOCwyMjcsODMsNyw0MywwLDgsMTE2LDAsOCw1MiwwLDksMjAxLDgxLDcsMTMsMCw4LDEwMCwwLDgsMzYsMCw5LDE2OSwwLDgsNCwwLDgsMTMyLDAsOCw2OCwwLDksMjMzLDgwLDcsOCwwLDgsOTIsMCw4LDI4LDAsOSwxNTMsODQsNyw4MywwLDgsMTI0LDAsOCw2MCwwLDksMjE3LDgyLDcsMjMsMCw4LDEwOCwwLDgsNDQsMCw5LDE4NSwwLDgsMTIsMCw4LDE0MCwwLDgsNzYsMCw5LDI0OSw4MCw3LDMsMCw4LDgyLDAsOCwxOCw4NSw4LDE2Myw4Myw3LDM1LDAsOCwxMTQsMCw4LDUwLDAsOSwxOTcsODEsNywxMSwwLDgsOTgsMCw4LDM0LDAsOSwxNjUsMCw4LDIsMCw4LDEzMCwwLDgsNjYsMCw5LDIyOSw4MCw3LDcsMCw4LDkwLDAsOCwyNiwwLDksMTQ5LDg0LDcsNjcsMCw4LDEyMiwwLDgsNTgsMCw5LDIxMyw4Miw3LDE5LDAsOCwxMDYsMCw4LDQyLDAsOSwxODEsMCw4LDEwLDAsOCwxMzgsMCw4LDc0LDAsOSwyNDUsODAsNyw1LDAsOCw4NiwwLDgsMjIsMTkyLDgsMCw4Myw3LDUxLDAsOCwxMTgsMCw4LDU0LDAsOSwyMDUsODEsNywxNSwwLDgsMTAyLDAsOCwzOCwwLDksMTczLDAsOCw2LDAsOCwxMzQsMCw4LDcwLDAsOSwyMzcsODAsNyw5LDAsOCw5NCwwLDgsMzAsMCw5LDE1Nyw4NCw3LDk5LDAsOCwxMjYsMCw4LDYyLDAsOSwyMjEsODIsNywyNywwLDgsMTEwLDAsOCw0NiwwLDksMTg5LDAsOCwxNCwwLDgsMTQyLDAsOCw3OCwwLDksMjUzLDk2LDcsMjU2LDAsOCw4MSwwLDgsMTcsODUsOCwxMzEsODIsNywzMSwwLDgsMTEzLDAsOCw0OSwwLDksMTk1LDgwLDcsMTAsMCw4LDk3LDAsOCwzMywwLDksMTYzLDAsOCwxLDAsOCwxMjksMCw4LDY1LDAsOSwyMjcsODAsNyw2LDAsOCw4OSwwLDgsMjUsMCw5LDE0Nyw4Myw3LDU5LDAsOCwxMjEsMCw4LDU3LDAsOSwyMTEsODEsNywxNywwLDgsMTA1LDAsOCw0MSwwLDksMTc5LDAsOCw5LDAsOCwxMzcsMCw4LDczLDAsOSwyNDMsODAsNyw0LDAsOCw4NSwwLDgsMjEsODAsOCwyNTgsODMsNyw0MywwLDgsMTE3LDAsOCw1MywwLDksMjAzLDgxLDcsMTMsMCw4LDEwMSwwLDgsMzcsMCw5LDE3MSwwLDgsNSwwLDgsMTMzLDAsOCw2OSwwLDksMjM1LDgwLDcsOCwwLDgsOTMsMCw4LDI5LDAsOSwxNTUsODQsNyw4MywwLDgsMTI1LDAsOCw2MSwwLDksMjE5LDgyLDcsMjMsMCw4LDEwOSwwLDgsNDUsMCw5LDE4NywwLDgsMTMsMCw4LDE0MSwwLDgsNzcsMCw5LDI1MSw4MCw3LDMsMCw4LDgzLDAsOCwxOSw4NSw4LDE5NSw4Myw3LDM1LDAsOCwxMTUsMCw4LDUxLDAsOSwxOTksODEsNywxMSwwLDgsOTksMCw4LDM1LDAsOSwxNjcsMCw4LDMsMCw4LDEzMSwwLDgsNjcsMCw5LDIzMSw4MCw3LDcsMCw4LDkxLDAsOCwyNywwLDksMTUxLDg0LDcsNjcsMCw4LDEyMywwLDgsNTksMCw5LDIxNSw4Miw3LDE5LDAsOCwxMDcsMCw4LDQzLDAsOSwxODMsMCw4LDExLDAsOCwxMzksMCw4LDc1LDAsOSwyNDcsODAsNyw1LDAsOCw4NywwLDgsMjMsMTkyLDgsMCw4Myw3LDUxLDAsOCwxMTksMCw4LDU1LDAsOSwyMDcsODEsNywxNSwwLDgsMTAzLDAsOCwzOSwwLDksMTc1LDAsOCw3LDAsOCwxMzUsMCw4LDcxLDAsOSwyMzksODAsNyw5LDAsOCw5NSwwLDgsMzEsMCw5LDE1OSw4NCw3LDk5LDAsOCwxMjcsMCw4LDYzLDAsOSwyMjMsODIsNywyNywwLDgsMTExLDAsOCw0NywwLDksMTkxLDAsOCwxNSwwLDgsMTQzLDAsOCw3OSwwLDksMjU1XSxRaz1bODAsNSwxLDg3LDUsMjU3LDgzLDUsMTcsOTEsNSw0MDk3LDgxLDUsNSw4OSw1LDEwMjUsODUsNSw2NSw5Myw1LDE2Mzg1LDgwLDUsMyw4OCw1LDUxMyw4NCw1LDMzLDkyLDUsODE5Myw4Miw1LDksOTAsNSwyMDQ5LDg2LDUsMTI5LDE5Miw1LDI0NTc3LDgwLDUsMiw4Nyw1LDM4NSw4Myw1LDI1LDkxLDUsNjE0NSw4MSw1LDcsODksNSwxNTM3LDg1LDUsOTcsOTMsNSwyNDU3Nyw4MCw1LDQsODgsNSw3NjksODQsNSw0OSw5Miw1LDEyMjg5LDgyLDUsMTMsOTAsNSwzMDczLDg2LDUsMTkzLDE5Miw1LDI0NTc3XSxaaz1bMyw0LDUsNiw3LDgsOSwxMCwxMSwxMywxNSwxNywxOSwyMywyNywzMSwzNSw0Myw1MSw1OSw2Nyw4Myw5OSwxMTUsMTMxLDE2MywxOTUsMjI3LDI1OCwwLDBdLG5TPVswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDAsMTEyLDExMl0sclM9WzEsMiwzLDQsNSw3LDksMTMsMTcsMjUsMzMsNDksNjUsOTcsMTI5LDE5MywyNTcsMzg1LDUxMyw3NjksMTAyNSwxNTM3LDIwNDksMzA3Myw0MDk3LDYxNDUsODE5MywxMjI4OSwxNjM4NSwyNDU3N10sdFM9WzAsMCwwLDAsMSwxLDIsMiwzLDMsNCw0LDUsNSw2LDYsNyw3LDgsOCw5LDksMTAsMTAsMTEsMTEsMTIsMTIsMTMsMTNdO2Z1bmN0aW9uIGVTKCl7dmFyIG4scix0LGUsaSxvO2Z1bmN0aW9uIHUobixyLHUsZixhLGMscyx2LGgsbCxkKXt2YXIgeSx3LGIscCxnLG0sQSxrLFMsaixPLEUsVCxSLFU7aj0wLGc9dTtkb3t0W25bcitqXV0rKyxqKyssZy0tfXdoaWxlKDAhPT1nKTtpZih0WzBdPT11KXJldHVybiBzWzBdPS0xLHZbMF09MCwwO2ZvcihrPXZbMF0sbT0xOzE1Pj1tJiYwPT09dFttXTttKyspO2ZvcihBPW0sbT5rJiYoaz1tKSxnPTE1OzAhPT1nJiYwPT09dFtnXTtnLS0pO2ZvcihiPWcsaz5nJiYoaz1nKSx2WzBdPWssUj0xPDxtO2c+bTttKyssUjw8PTEpaWYoMD4oUi09dFttXSkpcmV0dXJuLTM7aWYoMD4oUi09dFtnXSkpcmV0dXJuLTM7Zm9yKHRbZ10rPVIsb1sxXT1tPTAsaj0xLFQ9MjswIT0tLWc7KW9bVF09bSs9dFtqXSxUKyssaisrO2c9MCxqPTA7ZG97MCE9PShtPW5bcitqXSkmJihkW29bbV0rK109ZyksaisrfXdoaWxlKCsrZzx1KTtmb3IodT1vW2JdLG9bMF09Zz0wLGo9MCxwPS0xLEU9LWssaVswXT0wLE89MCxVPTA7Yj49QTtBKyspZm9yKHk9dFtBXTswIT15LS07KXtmb3IoO0E+RStrOyl7aWYocCsrLFU9KFU9Yi0oRSs9aykpPms/azpVLCh3PTE8PChtPUEtRSkpPnkrMSYmKHctPXkrMSxUPUEsVT5tKSlmb3IoOysrbTxVJiYodzw8PTEpPnRbKytUXTspdy09dFtUXTtpZihVPTE8PG0sbFswXStVPjE0NDApcmV0dXJuLTM7aVtwXT1PPWxbMF0sbFswXSs9VSwwIT09cD8ob1twXT1nLGVbMF09bSxlWzFdPWssbT1nPj4+RS1rLGVbMl09Ty1pW3AtMV0tbSxoLnNldChlLDMqKGlbcC0xXSttKSkpOnNbMF09T31mb3IoZVsxXT1BLUUsdT5qP2Rbal08Zj8oZVswXT0yNTY+ZFtqXT8wOjk2LGVbMl09ZFtqKytdKTooZVswXT1jW2Rbal0tZl0rMTYrNjQsZVsyXT1hW2RbaisrXS1mXSk6ZVswXT0xOTIsdz0xPDxBLUUsbT1nPj4+RTtVPm07bSs9dyloLnNldChlLDMqKE8rbSkpO2ZvcihtPTE8PEEtMTswIT0oZyZtKTttPj4+PTEpZ149bTtmb3IoZ149bSxTPSgxPDxFKS0xOyhnJlMpIT1vW3BdOylwLS0sUz0oMTw8KEUtPWspKS0xfXJldHVybiAwIT09UiYmMSE9Yj8tNTowfWZ1bmN0aW9uIGYodSl7dmFyIGY7Zm9yKG58fChuPVtdLHI9W10sdD1uZXcgSW50MzJBcnJheSgxNiksZT1bXSxpPW5ldyBJbnQzMkFycmF5KDE1KSxvPW5ldyBJbnQzMkFycmF5KDE2KSksci5sZW5ndGg8dSYmKHI9W10pLGY9MDt1PmY7ZisrKXJbZl09MDtmb3IoZj0wOzE2PmY7ZisrKXRbZl09MDtmb3IoZj0wOzM+ZjtmKyspZVtmXT0wO2kuc2V0KHQuc3ViYXJyYXkoMCwxNSksMCksby5zZXQodC5zdWJhcnJheSgwLDE2KSwwKX10aGlzLm5lPWZ1bmN0aW9uKHQsZSxpLG8sYSl7dmFyIGM7cmV0dXJuIGYoMTkpLG5bMF09MCwtMz09KGM9dSh0LDAsMTksMTksbnVsbCxudWxsLGksZSxvLG4scikpP2EuR3Q9Im92ZXJzdWJzY3JpYmVkIGR5bmFtaWMgYml0IGxlbmd0aHMgdHJlZSI6LTUhPWMmJjAhPT1lWzBdfHwoYS5HdD0iaW5jb21wbGV0ZSBkeW5hbWljIGJpdCBsZW5ndGhzIHRyZWUiLGM9LTMpLGN9LHRoaXMucmU9ZnVuY3Rpb24odCxlLGksbyxhLGMscyx2LGgpe3ZhciBsO3JldHVybiBmKDI4OCksblswXT0wLDAhPShsPXUoaSwwLHQsMjU3LFprLG5TLGMsbyx2LG4scikpfHwwPT09b1swXT8oLTM9PWw/aC5HdD0ib3ZlcnN1YnNjcmliZWQgbGl0ZXJhbC9sZW5ndGggdHJlZSI6LTQhPWwmJihoLkd0PSJpbmNvbXBsZXRlIGxpdGVyYWwvbGVuZ3RoIHRyZWUiLGw9LTMpLGwpOihmKDI4OCksMCE9KGw9dShpLHQsZSwwLHJTLHRTLHMsYSx2LG4scikpfHwwPT09YVswXSYmdD4yNTc/KC0zPT1sP2guR3Q9Im92ZXJzdWJzY3JpYmVkIGRpc3RhbmNlIHRyZWUiOi01PT1sPyhoLkd0PSJpbmNvbXBsZXRlIGRpc3RhbmNlIHRyZWUiLGw9LTMpOi00IT1sJiYoaC5HdD0iZW1wdHkgZGlzdGFuY2UgdHJlZSB3aXRoIGxlbmd0aHMiLGw9LTMpLGwpOjApfX1mdW5jdGlvbiBpUygpe3ZhciBuLHIsdCxlLGk9dGhpcyxvPTAsdT0wLGY9MCxhPTAsYz0wLHM9MCx2PTAsaD0wLGw9MCxkPTA7ZnVuY3Rpb24geShuLHIsdCxlLGksbyx1LGYpe3ZhciBhLGMscyx2LGgsbCxkLHksdyxiLHAsZyxtLEEsayxTO2Q9Zi5RdCx5PWYuTnQsaD11LnRlLGw9dS5lZSxiPSh3PXUud3JpdGUpPHUucmVhZD91LnJlYWQtdy0xOnUuZW5kLXcscD1Ka1tuXSxnPUprW3JdO2Rve2Zvcig7MjA+bDspeS0tLGh8PSgyNTUmZi5pZShkKyspKTw8bCxsKz04O2lmKDAhPT0odj0oYz10KVtTPTMqKChzPWUpKyhhPWgmcCkpXSkpZm9yKDs7KXtpZihoPj49Y1tTKzFdLGwtPWNbUysxXSwwIT0oMTYmdikpe2Zvcih2Jj0xNSxtPWNbUysyXSsoaCZKa1t2XSksaD4+PXYsbC09djsxNT5sOyl5LS0saHw9KDI1NSZmLmllKGQrKykpPDxsLGwrPTg7Zm9yKHY9KGM9aSlbUz0zKigocz1vKSsoYT1oJmcpKV07Oyl7aWYoaD4+PWNbUysxXSxsLT1jW1MrMV0sMCE9KDE2JnYpKXtmb3IodiY9MTU7dj5sOyl5LS0saHw9KDI1NSZmLmllKGQrKykpPDxsLGwrPTg7aWYoQT1jW1MrMl0rKGgmSmtbdl0pLGg+Pj12LGwtPXYsYi09bSxBPncpe2s9dy1BO2Rve2srPXUuZW5kfXdoaWxlKDA+ayk7aWYobT4odj11LmVuZC1rKSl7aWYobS09dix3LWs+MCYmdj53LWspZG97dS5vZVt3KytdPXUub2VbaysrXX13aGlsZSgwIT0tLXYpO2Vsc2UgdS5vZS5zZXQodS5vZS5zdWJhcnJheShrLGsrdiksdyksdys9dixrKz12LHY9MDtrPTB9fWVsc2Ugdy0oaz13LUEpPjAmJjI+dy1rPyh1Lm9lW3crK109dS5vZVtrKytdLHUub2VbdysrXT11Lm9lW2srK10sbS09Mik6KHUub2Uuc2V0KHUub2Uuc3ViYXJyYXkoayxrKzIpLHcpLHcrPTIsays9MixtLT0yKTtpZih3LWs+MCYmbT53LWspZG97dS5vZVt3KytdPXUub2VbaysrXX13aGlsZSgwIT0tLW0pO2Vsc2UgdS5vZS5zZXQodS5vZS5zdWJhcnJheShrLGsrbSksdyksdys9bSxrKz1tLG09MDticmVha31pZigwIT0oNjQmdikpcmV0dXJuIGYuR3Q9ImludmFsaWQgZGlzdGFuY2UgY29kZSIseSs9bT0obT1mLk50LXkpPmw+PjM/bD4+MzptLGQtPW0sbC09bTw8Myx1LnRlPWgsdS5lZT1sLGYuTnQ9eSxmLll0Kz1kLWYuUXQsZi5RdD1kLHUud3JpdGU9dywtMzthKz1jW1MrMl0sdj1jW1M9MyoocysoYSs9aCZKa1t2XSkpXX1icmVha31pZigwIT0oNjQmdikpcmV0dXJuIDAhPSgzMiZ2KT8oeSs9bT0obT1mLk50LXkpPmw+PjM/bD4+MzptLGQtPW0sbC09bTw8Myx1LnRlPWgsdS5lZT1sLGYuTnQ9eSxmLll0Kz1kLWYuUXQsZi5RdD1kLHUud3JpdGU9dywxKTooZi5HdD0iaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIix5Kz1tPShtPWYuTnQteSk+bD4+Mz9sPj4zOm0sZC09bSxsLT1tPDwzLHUudGU9aCx1LmVlPWwsZi5OdD15LGYuWXQrPWQtZi5RdCxmLlF0PWQsdS53cml0ZT13LC0zKTtpZihhKz1jW1MrMl0sMD09PSh2PWNbUz0zKihzKyhhKz1oJkprW3ZdKSldKSl7aD4+PWNbUysxXSxsLT1jW1MrMV0sdS5vZVt3KytdPWNbUysyXSxiLS07YnJlYWt9fWVsc2UgaD4+PWNbUysxXSxsLT1jW1MrMV0sdS5vZVt3KytdPWNbUysyXSxiLS19d2hpbGUoYj49MjU4JiZ5Pj0xMCk7cmV0dXJuIHkrPW09KG09Zi5OdC15KT5sPj4zP2w+PjM6bSxkLT1tLGwtPW08PDMsdS50ZT1oLHUuZWU9bCxmLk50PXksZi5ZdCs9ZC1mLlF0LGYuUXQ9ZCx1LndyaXRlPXcsMH1pLmluaXQ9ZnVuY3Rpb24oaSxvLHUsZixhLGMpe249MCx2PWksaD1vLHQ9dSxsPWYsZT1hLGQ9YyxyPW51bGx9LGkudWU9ZnVuY3Rpb24oaSx3LGIpe3ZhciBwLGcsbSxBLGssUyxqLE89MCxFPTAsVD0wO2ZvcihUPXcuUXQsQT13Lk50LE89aS50ZSxFPWkuZWUsUz0oaz1pLndyaXRlKTxpLnJlYWQ/aS5yZWFkLWstMTppLmVuZC1rOzspc3dpdGNoKG4pe2Nhc2UgMDppZihTPj0yNTgmJkE+PTEwJiYoaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssYj15KHYsaCx0LGwsZSxkLGksdyksVD13LlF0LEE9dy5OdCxPPWkudGUsRT1pLmVlLFM9KGs9aS53cml0ZSk8aS5yZWFkP2kucmVhZC1rLTE6aS5lbmQtaywwIT1iKSl7bj0xPT1iPzc6OTticmVha31mPXYscj10LHU9bCxuPTE7Y2FzZSAxOmZvcihwPWY7cD5FOyl7aWYoMD09PUEpcmV0dXJuIGkudGU9TyxpLmVlPUUsdy5OdD1BLHcuWXQrPVQtdy5RdCx3LlF0PVQsaS53cml0ZT1rLGkuZmUodyxiKTtiPTAsQS0tLE98PSgyNTUmdy5pZShUKyspKTw8RSxFKz04fWlmKE8+Pj49clsxKyhnPTMqKHUrKE8mSmtbcF0pKSldLEUtPXJbZysxXSwwPT09KG09cltnXSkpe2E9cltnKzJdLG49NjticmVha31pZigwIT0oMTYmbSkpe2M9MTUmbSxvPXJbZysyXSxuPTI7YnJlYWt9aWYoMD09KDY0Jm0pKXtmPW0sdT1nLzMrcltnKzJdO2JyZWFrfWlmKDAhPSgzMiZtKSl7bj03O2JyZWFrfXJldHVybiBuPTksdy5HdD0iaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIixiPS0zLGkudGU9TyxpLmVlPUUsdy5OdD1BLHcuWXQrPVQtdy5RdCx3LlF0PVQsaS53cml0ZT1rLGkuZmUodyxiKTtjYXNlIDI6Zm9yKHA9YztwPkU7KXtpZigwPT09QSlyZXR1cm4gaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpO2I9MCxBLS0sT3w9KDI1NSZ3LmllKFQrKykpPDxFLEUrPTh9bys9TyZKa1twXSxPPj49cCxFLT1wLGY9aCxyPWUsdT1kLG49MztjYXNlIDM6Zm9yKHA9ZjtwPkU7KXtpZigwPT09QSlyZXR1cm4gaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpO2I9MCxBLS0sT3w9KDI1NSZ3LmllKFQrKykpPDxFLEUrPTh9aWYoTz4+PXJbMSsoZz0zKih1KyhPJkprW3BdKSkpXSxFLT1yW2crMV0sMCE9KDE2JihtPXJbZ10pKSl7Yz0xNSZtLHM9cltnKzJdLG49NDticmVha31pZigwPT0oNjQmbSkpe2Y9bSx1PWcvMytyW2crMl07YnJlYWt9cmV0dXJuIG49OSx3Lkd0PSJpbnZhbGlkIGRpc3RhbmNlIGNvZGUiLGI9LTMsaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpO2Nhc2UgNDpmb3IocD1jO3A+RTspe2lmKDA9PT1BKXJldHVybiBpLnRlPU8saS5lZT1FLHcuTnQ9QSx3Lll0Kz1ULXcuUXQsdy5RdD1ULGkud3JpdGU9ayxpLmZlKHcsYik7Yj0wLEEtLSxPfD0oMjU1JncuaWUoVCsrKSk8PEUsRSs9OH1zKz1PJkprW3BdLE8+Pj1wLEUtPXAsbj01O2Nhc2UgNTpmb3Ioaj1rLXM7MD5qOylqKz1pLmVuZDtmb3IoOzAhPT1vOyl7aWYoMD09PVMmJihrPT1pLmVuZCYmMCE9PWkucmVhZCYmKFM9KGs9MCk8aS5yZWFkP2kucmVhZC1rLTE6aS5lbmQtayksMD09PVMmJihpLndyaXRlPWssYj1pLmZlKHcsYiksUz0oaz1pLndyaXRlKTxpLnJlYWQ/aS5yZWFkLWstMTppLmVuZC1rLGs9PWkuZW5kJiYwIT09aS5yZWFkJiYoUz0oaz0wKTxpLnJlYWQ/aS5yZWFkLWstMTppLmVuZC1rKSwwPT09UykpKXJldHVybiBpLnRlPU8saS5lZT1FLHcuTnQ9QSx3Lll0Kz1ULXcuUXQsdy5RdD1ULGkud3JpdGU9ayxpLmZlKHcsYik7aS5vZVtrKytdPWkub2VbaisrXSxTLS0saj09aS5lbmQmJihqPTApLG8tLX1uPTA7YnJlYWs7Y2FzZSA2OmlmKDA9PT1TJiYoaz09aS5lbmQmJjAhPT1pLnJlYWQmJihTPShrPTApPGkucmVhZD9pLnJlYWQtay0xOmkuZW5kLWspLDA9PT1TJiYoaS53cml0ZT1rLGI9aS5mZSh3LGIpLFM9KGs9aS53cml0ZSk8aS5yZWFkP2kucmVhZC1rLTE6aS5lbmQtayxrPT1pLmVuZCYmMCE9PWkucmVhZCYmKFM9KGs9MCk8aS5yZWFkP2kucmVhZC1rLTE6aS5lbmQtayksMD09PVMpKSlyZXR1cm4gaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpO2I9MCxpLm9lW2srK109YSxTLS0sbj0wO2JyZWFrO2Nhc2UgNzppZihFPjcmJihFLT04LEErKyxULS0pLGkud3JpdGU9ayxiPWkuZmUodyxiKSxTPShrPWkud3JpdGUpPGkucmVhZD9pLnJlYWQtay0xOmkuZW5kLWssaS5yZWFkIT1pLndyaXRlKXJldHVybiBpLnRlPU8saS5lZT1FLHcuTnQ9QSx3Lll0Kz1ULXcuUXQsdy5RdD1ULGkud3JpdGU9ayxpLmZlKHcsYik7bj04O2Nhc2UgODpyZXR1cm4gYj0xLGkudGU9TyxpLmVlPUUsdy5OdD1BLHcuWXQrPVQtdy5RdCx3LlF0PVQsaS53cml0ZT1rLGkuZmUodyxiKTtjYXNlIDk6cmV0dXJuIGI9LTMsaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpO2RlZmF1bHQ6cmV0dXJuIGI9LTIsaS50ZT1PLGkuZWU9RSx3Lk50PUEsdy5ZdCs9VC13LlF0LHcuUXQ9VCxpLndyaXRlPWssaS5mZSh3LGIpfX0saS5hZT1mdW5jdGlvbigpe319ZVMuY2U9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIG5bMF09OSxyWzBdPTUsdFswXT1YayxlWzBdPVFrLDB9O3ZhciBvUz1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV07ZnVuY3Rpb24gdVMobixyKXt2YXIgdCxlPXRoaXMsaT0wLG89MCx1PTAsZj0wLGE9WzBdLGM9WzBdLHM9bmV3IGlTLHY9MCxoPW5ldyBJbnQzMkFycmF5KDQzMjApLGw9bmV3IGVTO2UuZWU9MCxlLnRlPTAsZS5vZT1uZXcgVWludDhBcnJheShyKSxlLmVuZD1yLGUucmVhZD0wLGUud3JpdGU9MCxlLnJlc2V0PWZ1bmN0aW9uKG4scil7ciYmKHJbMF09MCksNj09aSYmcy5hZShuKSxpPTAsZS5lZT0wLGUudGU9MCxlLnJlYWQ9ZS53cml0ZT0wfSxlLnJlc2V0KG4sbnVsbCksZS5mZT1mdW5jdGlvbihuLHIpe3ZhciB0LGksbztyZXR1cm4gaT1uLlp0LCh0PSgobz1lLnJlYWQpPmUud3JpdGU/ZS5lbmQ6ZS53cml0ZSktbyk+bi5YdCYmKHQ9bi5YdCksMCE9PXQmJi01PT1yJiYocj0wKSxuLlh0LT10LG4uenQrPXQsbi5xdC5zZXQoZS5vZS5zdWJhcnJheShvLG8rdCksaSksaSs9dCwobys9dCk9PWUuZW5kJiYobz0wLGUud3JpdGU9PWUuZW5kJiYoZS53cml0ZT0wKSwodD1lLndyaXRlLW8pPm4uWHQmJih0PW4uWHQpLDAhPT10JiYtNT09ciYmKHI9MCksbi5YdC09dCxuLnp0Kz10LG4ucXQuc2V0KGUub2Uuc3ViYXJyYXkobyxvK3QpLGkpLGkrPXQsbys9dCksbi5adD1pLGUucmVhZD1vLHJ9LGUudWU9ZnVuY3Rpb24obixyKXt2YXIgZCx5LHcsYixwLGcsbSxBO2ZvcihiPW4uUXQscD1uLk50LHk9ZS50ZSx3PWUuZWUsbT0oZz1lLndyaXRlKTxlLnJlYWQ/ZS5yZWFkLWctMTplLmVuZC1nOzspe3ZhciBrPXZvaWQgMCxTPXZvaWQgMCxqPXZvaWQgMCxPPXZvaWQgMCxFPXZvaWQgMCxUPXZvaWQgMCxSPXZvaWQgMCxVPXZvaWQgMDtzd2l0Y2goaSl7Y2FzZSAwOmZvcig7Mz53Oyl7aWYoMD09PXApcmV0dXJuIGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKTtyPTAscC0tLHl8PSgyNTUmbi5pZShiKyspKTw8dyx3Kz04fXN3aXRjaCh2PTEmKGQ9NyZ5KSxkPj4+MSl7Y2FzZSAwOnk+Pj49Myx5Pj4+PWQ9NyYody09Myksdy09ZCxpPTE7YnJlYWs7Y2FzZSAxOms9W10sUz1bXSxqPVtbXV0sTz1bW11dLGVTLmNlKGssUyxqLE8pLHMuaW5pdChrWzBdLFNbMF0salswXSwwLE9bMF0sMCkseT4+Pj0zLHctPTMsaT02O2JyZWFrO2Nhc2UgMjp5Pj4+PTMsdy09MyxpPTM7YnJlYWs7Y2FzZSAzOnJldHVybiB5Pj4+PTMsdy09MyxpPTksbi5HdD0iaW52YWxpZCBibG9jayB0eXBlIixyPS0zLGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKX1icmVhaztjYXNlIDE6Zm9yKDszMj53Oyl7aWYoMD09PXApcmV0dXJuIGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKTtyPTAscC0tLHl8PSgyNTUmbi5pZShiKyspKTw8dyx3Kz04fWlmKCh+eT4+PjE2JjY1NTM1KSE9KDY1NTM1JnkpKXJldHVybiBpPTksbi5HdD0iaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3RocyIscj0tMyxlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7bz02NTUzNSZ5LHk9dz0wLGk9MCE9PW8/MjowIT09dj83OjA7YnJlYWs7Y2FzZSAyOmlmKDA9PT1wKXJldHVybiBlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7aWYoMD09PW0mJihnPT1lLmVuZCYmMCE9PWUucmVhZCYmKG09KGc9MCk8ZS5yZWFkP2UucmVhZC1nLTE6ZS5lbmQtZyksMD09PW0mJihlLndyaXRlPWcscj1lLmZlKG4sciksbT0oZz1lLndyaXRlKTxlLnJlYWQ/ZS5yZWFkLWctMTplLmVuZC1nLGc9PWUuZW5kJiYwIT09ZS5yZWFkJiYobT0oZz0wKTxlLnJlYWQ/ZS5yZWFkLWctMTplLmVuZC1nKSwwPT09bSkpKXJldHVybiBlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7aWYocj0wLChkPW8pPnAmJihkPXApLGQ+bSYmKGQ9bSksZS5vZS5zZXQobi5CdChiLGQpLGcpLGIrPWQscC09ZCxnKz1kLG0tPWQsMCE9KG8tPWQpKWJyZWFrO2k9MCE9PXY/NzowO2JyZWFrO2Nhc2UgMzpmb3IoOzE0Pnc7KXtpZigwPT09cClyZXR1cm4gZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO3I9MCxwLS0seXw9KDI1NSZuLmllKGIrKykpPDx3LHcrPTh9aWYodT1kPTE2MzgzJnksKDMxJmQpPjI5fHwoZD4+NSYzMSk+MjkpcmV0dXJuIGk9OSxuLkd0PSJ0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scyIscj0tMyxlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7aWYoZD0yNTgrKDMxJmQpKyhkPj41JjMxKSwhdHx8dC5sZW5ndGg8ZCl0PVtdO2Vsc2UgZm9yKEE9MDtkPkE7QSsrKXRbQV09MDt5Pj4+PTE0LHctPTE0LGY9MCxpPTQ7Y2FzZSA0OmZvcig7NCsodT4+PjEwKT5mOyl7Zm9yKDszPnc7KXtpZigwPT09cClyZXR1cm4gZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO3I9MCxwLS0seXw9KDI1NSZuLmllKGIrKykpPDx3LHcrPTh9dFtvU1tmKytdXT03JnkseT4+Pj0zLHctPTN9Zm9yKDsxOT5mOyl0W29TW2YrK11dPTA7aWYoYVswXT03LDAhPShkPWwubmUodCxhLGMsaCxuKSkpcmV0dXJuLTM9PShyPWQpJiYodD1udWxsLGk9OSksZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO2Y9MCxpPTU7Y2FzZSA1OmZvcig7ZjwyNTgrKDMxJihkPXUpKSsoZD4+NSYzMSk7KXt2YXIgTT12b2lkIDAsST12b2lkIDA7Zm9yKGQ9YVswXTtkPnc7KXtpZigwPT09cClyZXR1cm4gZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO3I9MCxwLS0seXw9KDI1NSZuLmllKGIrKykpPDx3LHcrPTh9aWYoZD1oWzMqKGNbMF0rKHkmSmtbZF0pKSsxXSwxNj4oST1oWzMqKGNbMF0rKHkmSmtbZF0pKSsyXSkpeT4+Pj1kLHctPWQsdFtmKytdPUk7ZWxzZXtmb3IoQT0xOD09ST83OkktMTQsTT0xOD09ST8xMTozO2QrQT53Oyl7aWYoMD09PXApcmV0dXJuIGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKTtyPTAscC0tLHl8PSgyNTUmbi5pZShiKyspKTw8dyx3Kz04fWlmKHctPWQsTSs9KHk+Pj49ZCkmSmtbQV0seT4+Pj1BLHctPUEsKEE9ZikrTT4yNTgrKDMxJihkPXUpKSsoZD4+NSYzMSl8fDE2PT1JJiYxPkEpcmV0dXJuIHQ9bnVsbCxpPTksbi5HdD0iaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdCIscj0tMyxlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7ST0xNj09ST90W0EtMV06MDtkb3t0W0ErK109SX13aGlsZSgwIT0tLU0pO2Y9QX19aWYoY1swXT0tMSxUPVtdLFI9W10sVT1bXSwoRT1bXSlbMF09OSxUWzBdPTYsZD11LDAhPShkPWwucmUoMjU3KygzMSZkKSwxKyhkPj41JjMxKSx0LEUsVCxSLFUsaCxuKSkpcmV0dXJuLTM9PWQmJih0PW51bGwsaT05KSxyPWQsZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO3MuaW5pdChFWzBdLFRbMF0saCxSWzBdLGgsVVswXSksaT02O2Nhc2UgNjppZihlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZywxIT0ocj1zLnVlKGUsbixyKSkpcmV0dXJuIGUuZmUobixyKTtpZihyPTAscy5hZShuKSxiPW4uUXQscD1uLk50LHk9ZS50ZSx3PWUuZWUsbT0oZz1lLndyaXRlKTxlLnJlYWQ/ZS5yZWFkLWctMTplLmVuZC1nLDA9PT12KXtpPTA7YnJlYWt9aT03O2Nhc2UgNzppZihlLndyaXRlPWcscj1lLmZlKG4sciksbT0oZz1lLndyaXRlKTxlLnJlYWQ/ZS5yZWFkLWctMTplLmVuZC1nLGUucmVhZCE9ZS53cml0ZSlyZXR1cm4gZS50ZT15LGUuZWU9dyxuLk50PXAsbi5ZdCs9Yi1uLlF0LG4uUXQ9YixlLndyaXRlPWcsZS5mZShuLHIpO2k9ODtjYXNlIDg6cmV0dXJuIHI9MSxlLnRlPXksZS5lZT13LG4uTnQ9cCxuLll0Kz1iLW4uUXQsbi5RdD1iLGUud3JpdGU9ZyxlLmZlKG4scik7Y2FzZSA5OnJldHVybiByPS0zLGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKTtkZWZhdWx0OnJldHVybiByPS0yLGUudGU9eSxlLmVlPXcsbi5OdD1wLG4uWXQrPWItbi5RdCxuLlF0PWIsZS53cml0ZT1nLGUuZmUobixyKX19fSxlLmFlPWZ1bmN0aW9uKG4pe2UucmVzZXQobixudWxsKSxlLm9lPW51bGwsaD1udWxsfSxlLnNlPWZ1bmN0aW9uKG4scix0KXtlLm9lLnNldChuLnN1YmFycmF5KHIscit0KSwwKSxlLnJlYWQ9ZS53cml0ZT10fSxlLnZlPWZ1bmN0aW9uKCl7cmV0dXJuIDE9PWk/MTowfX12YXIgZlM9WzAsMCwyNTUsMjU1XTtmdW5jdGlvbiBhUygpe3ZhciBuPXRoaXM7ZnVuY3Rpb24gcihuKXtyZXR1cm4gbiYmbi5oZT8obi5ZdD1uLnp0PTAsbi5HdD1udWxsLG4uaGUubW9kZT03LG4uaGUubGUucmVzZXQobixudWxsKSwwKTotMn1uLm1vZGU9MCxuLm1ldGhvZD0wLG4uZGU9WzBdLG4ueWU9MCxuLm1hcmtlcj0wLG4ud2U9MCxuLmJlPWZ1bmN0aW9uKHIpe3JldHVybiBuLmxlJiZuLmxlLmFlKHIpLG4ubGU9bnVsbCwwfSxuLnBlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuR3Q9bnVsbCxuLmxlPW51bGwsOD5lfHxlPjE1PyhuLmJlKHQpLC0yKToobi53ZT1lLHQuaGUubGU9bmV3IHVTKHQsMTw8ZSkscih0KSwwKX0sbi5Ocj1mdW5jdGlvbihuLHIpe3ZhciB0LGU7aWYoIW58fCFuLmhlfHwhbi5KdClyZXR1cm4tMjt2YXIgaT1uLmhlO2ZvcihyPTQ9PXI/LTU6MCx0PS01Ozspc3dpdGNoKGkubW9kZSl7Y2FzZSAwOmlmKDA9PT1uLk50KXJldHVybiB0O2lmKHQ9cixuLk50LS0sbi5ZdCsrLDghPSgxNSYoaS5tZXRob2Q9bi5pZShuLlF0KyspKSkpe2kubW9kZT0xMyxuLkd0PSJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZCIsaS5tYXJrZXI9NTticmVha31pZig4KyhpLm1ldGhvZD4+NCk+aS53ZSl7aS5tb2RlPTEzLG4uR3Q9ImludmFsaWQgd2luIHNpemUiLGkubWFya2VyPTU7YnJlYWt9aS5tb2RlPTE7Y2FzZSAxOmlmKDA9PT1uLk50KXJldHVybiB0O2lmKHQ9cixuLk50LS0sbi5ZdCsrLGU9MjU1Jm4uaWUobi5RdCsrKSwoKGkubWV0aG9kPDw4KStlKSUzMSE9MCl7aS5tb2RlPTEzLG4uR3Q9ImluY29ycmVjdCBoZWFkZXIgY2hlY2siLGkubWFya2VyPTU7YnJlYWt9aWYoMD09KDMyJmUpKXtpLm1vZGU9NzticmVha31pLm1vZGU9MjtjYXNlIDI6aWYoMD09PW4uTnQpcmV0dXJuIHQ7dD1yLG4uTnQtLSxuLll0KyssaS55ZT0oMjU1Jm4uaWUobi5RdCsrKSk8PDI0JjQyNzgxOTAwODAsaS5tb2RlPTM7Y2FzZSAzOmlmKDA9PT1uLk50KXJldHVybiB0O3Q9cixuLk50LS0sbi5ZdCsrLGkueWUrPSgyNTUmbi5pZShuLlF0KyspKTw8MTYmMTY3MTE2ODAsaS5tb2RlPTQ7Y2FzZSA0OmlmKDA9PT1uLk50KXJldHVybiB0O3Q9cixuLk50LS0sbi5ZdCsrLGkueWUrPSgyNTUmbi5pZShuLlF0KyspKTw8OCY2NTI4MCxpLm1vZGU9NTtjYXNlIDU6cmV0dXJuIDA9PT1uLk50P3Q6KHQ9cixuLk50LS0sbi5ZdCsrLGkueWUrPTI1NSZuLmllKG4uUXQrKyksaS5tb2RlPTYsMik7Y2FzZSA2OnJldHVybiBpLm1vZGU9MTMsbi5HdD0ibmVlZCBkaWN0aW9uYXJ5IixpLm1hcmtlcj0wLC0yO2Nhc2UgNzppZigtMz09KHQ9aS5sZS51ZShuLHQpKSl7aS5tb2RlPTEzLGkubWFya2VyPTA7YnJlYWt9aWYoMD09dCYmKHQ9ciksMSE9dClyZXR1cm4gdDt0PXIsaS5sZS5yZXNldChuLGkuZGUpLGkubW9kZT0xMjtjYXNlIDEyOnJldHVybiBuLk50PTAsMTtjYXNlIDEzOnJldHVybi0zO2RlZmF1bHQ6cmV0dXJuLTJ9fSxuLmdlPWZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLGk9dDtpZighbnx8IW4uaGV8fDYhPW4uaGUubW9kZSlyZXR1cm4tMjt2YXIgbz1uLmhlO3JldHVybiBpPDE8PG8ud2V8fChlPXQtKGk9KDE8PG8ud2UpLTEpKSxvLmxlLnNlKHIsZSxpKSxvLm1vZGU9NywwfSxuLm1lPWZ1bmN0aW9uKG4pe3ZhciB0LGUsaSxvLHU7aWYoIW58fCFuLmhlKXJldHVybi0yO3ZhciBmPW4uaGU7aWYoMTMhPWYubW9kZSYmKGYubW9kZT0xMyxmLm1hcmtlcj0wKSwwPT09KHQ9bi5OdCkpcmV0dXJuLTU7Zm9yKGU9bi5RdCxpPWYubWFya2VyOzAhPT10JiY0Pmk7KW4uaWUoZSk9PWZTW2ldP2krKzppPTAhPT1uLmllKGUpPzA6NC1pLGUrKyx0LS07cmV0dXJuIG4uWXQrPWUtbi5RdCxuLlF0PWUsbi5OdD10LGYubWFya2VyPWksNCE9aT8tMzoobz1uLll0LHU9bi56dCxyKG4pLG4uWXQ9byxuLnp0PXUsZi5tb2RlPTcsMCl9LG4uQWU9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4uaGUmJm4uaGUubGU/bi5oZS5sZS52ZSgpOi0yfX1mdW5jdGlvbiBjUygpe31mdW5jdGlvbiBzUyhuKXt2YXIgcj1uZXcgY1MsdD1uJiZuLkZyP01hdGguZmxvb3IoMipuLkZyKToxMzEwNzIsZT1uZXcgVWludDhBcnJheSh0KSxpPSExO3IucGUoKSxyLnF0PWUsdGhpcy5hcHBlbmQ9ZnVuY3Rpb24obixvKXt2YXIgdSxmLGE9W10sYz0wLHM9MCx2PTA7aWYoMCE9PW4ubGVuZ3RoKXtyLlF0PTAsci5KdD1uLHIuTnQ9bi5sZW5ndGg7ZG97aWYoci5adD0wLHIuWHQ9dCwwIT09ci5OdHx8aXx8KHIuUXQ9MCxpPSEwKSx1PXIuTnIoMCksaSYmLTU9PT11KXtpZigwIT09ci5OdCl0aHJvdyBFcnJvcigiaW5mbGF0aW5nOiBiYWQgaW5wdXQiKX1lbHNlIGlmKDAhPT11JiYxIT09dSl0aHJvdyBFcnJvcigiaW5mbGF0aW5nOiAiK3IuR3QpO2lmKChpfHwxPT09dSkmJnIuTnQ9PT1uLmxlbmd0aCl0aHJvdyBFcnJvcigiaW5mbGF0aW5nOiBiYWQgaW5wdXQiKTtyLlp0JiYoci5adD09PXQ/YS5wdXNoKG5ldyBVaW50OEFycmF5KGUpKTphLnB1c2goZS5zbGljZSgwLHIuWnQpKSksdis9ci5adCxvJiZyLlF0PjAmJnIuUXQhPWMmJihvKHIuUXQpLGM9ci5RdCl9d2hpbGUoci5OdD4wfHwwPT09ci5YdCk7cmV0dXJuIGEubGVuZ3RoPjE/KGY9bmV3IFVpbnQ4QXJyYXkodiksYS5mb3JFYWNoKChmdW5jdGlvbihuKXtmLnNldChuLHMpLHMrPW4ubGVuZ3RofSkpKTpmPWFbMF18fG5ldyBVaW50OEFycmF5KDApLGZ9fSx0aGlzLmZsdXNoPWZ1bmN0aW9uKCl7ci5iZSgpfX1jUy5wcm90b3R5cGU9e3BlOmZ1bmN0aW9uKG4pe3ZhciByPXRoaXM7cmV0dXJuIHIuaGU9bmV3IGFTLG58fChuPTE1KSxyLmhlLnBlKHIsbil9LE5yOmZ1bmN0aW9uKG4pe3ZhciByPXRoaXM7cmV0dXJuIHIuaGU/ci5oZS5OcihyLG4pOi0yfSxiZTpmdW5jdGlvbigpe3ZhciBuPXRoaXM7aWYoIW4uaGUpcmV0dXJuLTI7dmFyIHI9bi5oZS5iZShuKTtyZXR1cm4gbi5oZT1udWxsLHJ9LG1lOmZ1bmN0aW9uKCl7dmFyIG49dGhpcztyZXR1cm4gbi5oZT9uLmhlLm1lKG4pOi0yfSxnZTpmdW5jdGlvbihuLHIpe3ZhciB0PXRoaXM7cmV0dXJuIHQuaGU/dC5oZS5nZSh0LG4scik6LTJ9LGllOmZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLkp0W25dfSxCdDpmdW5jdGlvbihuLHIpe3JldHVybiB0aGlzLkp0LnN1YmFycmF5KG4sbityKX19LHNlbGYuaW5pdENvZGVjPWZ1bmN0aW9uKCl7c2VsZi5EZWZsYXRlPXFrLHNlbGYuSW5mbGF0ZT1zU307Cg==")], {
	        type: "text/javascript"
	      }));
	    };

	    _b({
	      workerScripts: {
	        inflate: [d],
	        deflate: [d]
	      }
	    });
	  }
	};

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	function getMimeType() {
	  return "application/octet-stream";
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  Object.defineProperty(subClass, "prototype", {
	    writable: false
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get() {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get.apply(this, arguments);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

	  if (!it) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = it.call(o);
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	// A type of promise-like that resolves synchronously and supports only one observer
	const _Pact = /*#__PURE__*/(function() {
		function _Pact() {}
		_Pact.prototype.then = function(onFulfilled, onRejected) {
			const result = new _Pact();
			const state = this.s;
			if (state) {
				const callback = state & 1 ? onFulfilled : onRejected;
				if (callback) {
					try {
						_settle(result, 1, callback(this.v));
					} catch (e) {
						_settle(result, 2, e);
					}
					return result;
				} else {
					return this;
				}
			}
			this.o = function(_this) {
				try {
					const value = _this.v;
					if (_this.s & 1) {
						_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
					} else if (onRejected) {
						_settle(result, 1, onRejected(value));
					} else {
						_settle(result, 2, value);
					}
				} catch (e) {
					_settle(result, 2, e);
				}
			};
			return result;
		};
		return _Pact;
	})();

	// Settles a pact synchronously
	function _settle(pact, state, value) {
		if (!pact.s) {
			if (value instanceof _Pact) {
				if (value.s) {
					if (state & 1) {
						state = value.s;
					}
					value = value.v;
				} else {
					value.o = _settle.bind(null, pact, state);
					return;
				}
			}
			if (value && value.then) {
				value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
				return;
			}
			pact.s = state;
			pact.v = value;
			const observer = pact.o;
			if (observer) {
				observer(pact);
			}
		}
	}

	function _isSettledPact(thenable) {
		return thenable instanceof _Pact && thenable.s & 1;
	}

	// Converts argument to a function that always returns a Promise
	function _async(f) {
		return function() {
			for (var args = [], i = 0; i < arguments.length; i++) {
				args[i] = arguments[i];
			}
			try {
				return Promise.resolve(f.apply(this, args));
			} catch(e) {
				return Promise.reject(e);
			}
		}
	}

	// Awaits on a value that may or may not be a Promise (equivalent to the await keyword in ES2015, with continuations passed explicitly)
	function _await(value, then, direct) {
		if (direct) {
			return then ? then(value) : value;
		}
		if (!value || !value.then) {
			value = Promise.resolve(value);
		}
		return then ? value.then(then) : value;
	}

	// Awaits on a value that may or may not be a Promise, then ignores it
	function _awaitIgnored(value, direct) {
		if (!direct) {
			return value && value.then ? value.then(_empty) : Promise.resolve();
		}
	}

	// Proceeds after a value has resolved, or proceeds immediately if the value is not thenable
	function _continue(value, then) {
		return value && value.then ? value.then(then) : then(value);
	}

	// Proceeds after a value has resolved, or proceeds immediately if the value is not thenable
	function _continueIgnored(value) {
		if (value && value.then) {
			return value.then(_empty);
		}
	}

	// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
	function _forTo(array, body, check) {
		var i = -1, pact, reject;
		function _cycle(result) {
			try {
				while (++i < array.length && (!check || !check())) {
					result = body(i);
					if (result && result.then) {
						if (_isSettledPact(result)) {
							result = result.v;
						} else {
							result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
							return;
						}
					}
				}
				if (pact) {
					_settle(pact, 1, result);
				} else {
					pact = result;
				}
			} catch (e) {
				_settle(pact || (pact = new _Pact()), 2, e);
			}
		}
		_cycle();
		return pact;
	}

	const _iteratorSymbol =  typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

	// Asynchronously iterate through an object's values
	// Uses for...of if the runtime supports it, otherwise iterates until length on a copy
	function _forOf(target, body, check) {
		if (typeof target[_iteratorSymbol] === "function") {
			var iterator = target[_iteratorSymbol](), step, pact, reject;
			function _cycle(result) {
				try {
					while (!(step = iterator.next()).done && (!check || !check())) {
						result = body(step.value);
						if (result && result.then) {
							if (_isSettledPact(result)) {
								result = result.v;
							} else {
								result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
								return;
							}
						}
					}
					if (pact) {
						_settle(pact, 1, result);
					} else {
						pact = result;
					}
				} catch (e) {
					_settle(pact || (pact = new _Pact()), 2, e);
				}
			}
			_cycle();
			if (iterator.return) {
				var _fixup = function(value) {
					try {
						if (!step.done) {
							iterator.return();
						}
					} catch(e) {
					}
					return value;
				};
				if (pact && pact.then) {
					return pact.then(_fixup, function(e) {
						throw _fixup(e);
					});
				}
				_fixup();
			}
			return pact;
		}
		// No support for Symbol.iterator
		if (!("length" in target)) {
			throw new TypeError("Object is not iterable");
		}
		// Handle live collections properly
		var values = [];
		for (var i = 0; i < target.length; i++) {
			values.push(target[i]);
		}
		return _forTo(values, function(i) { return body(values[i]); }, check);
	}

	 typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

	// Asynchronously implement a generic for loop
	function _for(test, update, body) {
		var stage;
		for (;;) {
			var shouldContinue = test();
			if (_isSettledPact(shouldContinue)) {
				shouldContinue = shouldContinue.v;
			}
			if (!shouldContinue) {
				return result;
			}
			if (shouldContinue.then) {
				stage = 0;
				break;
			}
			var result = body();
			if (result && result.then) {
				if (_isSettledPact(result)) {
					result = result.s;
				} else {
					stage = 1;
					break;
				}
			}
			if (update) {
				var updateValue = update();
				if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
					stage = 2;
					break;
				}
			}
		}
		var pact = new _Pact();
		var reject = _settle.bind(null, pact, 2);
		(stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
		return pact;
		function _resumeAfterBody(value) {
			result = value;
			do {
				if (update) {
					updateValue = update();
					if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
						updateValue.then(_resumeAfterUpdate).then(void 0, reject);
						return;
					}
				}
				shouldContinue = test();
				if (!shouldContinue || (_isSettledPact(shouldContinue) && !shouldContinue.v)) {
					_settle(pact, 1, result);
					return;
				}
				if (shouldContinue.then) {
					shouldContinue.then(_resumeAfterTest).then(void 0, reject);
					return;
				}
				result = body();
				if (_isSettledPact(result)) {
					result = result.v;
				}
			} while (!result || !result.then);
			result.then(_resumeAfterBody).then(void 0, reject);
		}
		function _resumeAfterTest(shouldContinue) {
			if (shouldContinue) {
				result = body();
				if (result && result.then) {
					result.then(_resumeAfterBody).then(void 0, reject);
				} else {
					_resumeAfterBody(result);
				}
			} else {
				_settle(pact, 1, result);
			}
		}
		function _resumeAfterUpdate() {
			if (shouldContinue = test()) {
				if (shouldContinue.then) {
					shouldContinue.then(_resumeAfterTest).then(void 0, reject);
				} else {
					_resumeAfterTest(shouldContinue);
				}
			} else {
				_settle(pact, 1, result);
			}
		}
	}

	// Asynchronously implement a do ... while loop
	function _do(body, test) {
		var awaitBody;
		do {
			var result = body();
			if (result && result.then) {
				if (_isSettledPact(result)) {
					result = result.v;
				} else {
					awaitBody = true;
					break;
				}
			}
			var shouldContinue = test();
			if (_isSettledPact(shouldContinue)) {
				shouldContinue = shouldContinue.v;
			}
			if (!shouldContinue) {
				return result;
			}
		} while (!shouldContinue.then);
		const pact = new _Pact();
		const reject = _settle.bind(null, pact, 2);
		(awaitBody ? result.then(_resumeAfterBody) : shouldContinue.then(_resumeAfterTest)).then(void 0, reject);
		return pact;
		function _resumeAfterBody(value) {
			result = value;
			for (;;) {
				shouldContinue = test();
				if (_isSettledPact(shouldContinue)) {
					shouldContinue = shouldContinue.v;
				}
				if (!shouldContinue) {
					break;
				}
				if (shouldContinue.then) {
					shouldContinue.then(_resumeAfterTest).then(void 0, reject);
					return;
				}
				result = body();
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_resumeAfterBody).then(void 0, reject);
						return;
					}
				}
			}
			_settle(pact, 1, result);
		}
		function _resumeAfterTest(shouldContinue) {
			if (shouldContinue) {
				do {
					result = body();
					if (result && result.then) {
						if (_isSettledPact(result)) {
							result = result.v;
						} else {
							result.then(_resumeAfterBody).then(void 0, reject);
							return;
						}
					}
					shouldContinue = test();
					if (_isSettledPact(shouldContinue)) {
						shouldContinue = shouldContinue.v;
					}
					if (!shouldContinue) {
						_settle(pact, 1, result);
						return;
					}
				} while (!shouldContinue.then);
				shouldContinue.then(_resumeAfterTest).then(void 0, reject);
			} else {
				_settle(pact, 1, result);
			}
		}
	}

	// Asynchronously call a function and pass the result to explicitly passed continuations
	function _call(body, then, direct) {
		if (direct) {
			return then ? then(body()) : body();
		}
		try {
			var result = Promise.resolve(body());
			return then ? result.then(then) : result;
		} catch (e) {
			return Promise.reject(e);
		}
	}

	// Asynchronously call a function and swallow the result
	function _callIgnored(body, direct) {
		return _call(body, _empty, direct);
	}

	// Asynchronously call a function and pass the result to explicitly passed continuations
	function _invoke(body, then) {
		var result = body();
		if (result && result.then) {
			return result.then(then);
		}
		return then(result);
	}

	// Asynchronously call a function and swallow the result
	function _invokeIgnored(body) {
		var result = body();
		if (result && result.then) {
			return result.then(_empty);
		}
	}

	// Asynchronously call a function and send errors to recovery continuation
	function _catch(body, recover) {
		try {
			var result = body();
		} catch(e) {
			return recover(e);
		}
		if (result && result.then) {
			return result.then(void 0, recover);
		}
		return result;
	}

	// Asynchronously await a promise and pass the result to a finally continuation
	function _finallyRethrows(body, finalizer) {
		try {
			var result = body();
		} catch (e) {
			return finalizer(true, e);
		}
		if (result && result.then) {
			return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
		}
		return finalizer(false, result);
	}

	// Rethrow or return a value from a finally continuation
	function _rethrow(thrown, value) {
		if (thrown)
			throw value;
		return value;
	}

	// Empty function to implement break and other control flow that ignores asynchronous results
	function _empty() {
	}

	// eslint-disable-next-line es/no-typed-arrays -- safe
	var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

	var global$D = global$19;
	var toIntegerOrInfinity$5 = toIntegerOrInfinity$9;
	var toLength$8 = toLength$a;

	var RangeError$5 = global$D.RangeError;

	// `ToIndex` abstract operation
	// https://tc39.es/ecma262/#sec-toindex
	var toIndex$2 = function (it) {
	  if (it === undefined) return 0;
	  var number = toIntegerOrInfinity$5(it);
	  var length = toLength$8(number);
	  if (number !== length) throw RangeError$5('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var global$C = global$19;

	var Array$5 = global$C.Array;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$3 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = Array$5(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (number != number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare -- NaN check
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$3(log(number) / LN2);
	    c = pow(2, -exponent);
	    if (number * c < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  while (mantissaLength >= 8) {
	    buffer[index++] = mantissa & 255;
	    mantissa /= 256;
	    mantissaLength -= 8;
	  }
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  while (exponentLength > 0) {
	    buffer[index++] = exponent & 255;
	    exponent /= 256;
	    exponentLength -= 8;
	  }
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  while (nBits > 0) {
	    exponent = exponent * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  while (nBits > 0) {
	    mantissa = mantissa * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa = mantissa + pow(2, mantissaLength);
	    exponent = exponent - eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var toObject$8 = toObject$d;
	var toAbsoluteIndex$5 = toAbsoluteIndex$8;
	var lengthOfArrayLike$b = lengthOfArrayLike$f;

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject$8(this);
	  var length = lengthOfArrayLike$b(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex$5(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex$5(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var global$B = global$19;
	var uncurryThis$o = functionUncurryThis;
	var DESCRIPTORS$9 = descriptors;
	var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
	var FunctionName = functionName;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;
	var redefineAll$2 = redefineAll$4;
	var fails$q = fails$D;
	var anInstance$4 = anInstance$7;
	var toIntegerOrInfinity$4 = toIntegerOrInfinity$9;
	var toLength$7 = toLength$a;
	var toIndex$1 = toIndex$2;
	var IEEE754 = ieee754;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var setPrototypeOf$4 = objectSetPrototypeOf;
	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var defineProperty$7 = objectDefineProperty.f;
	var arrayFill = arrayFill$1;
	var arraySlice$8 = arraySliceSimple;
	var setToStringTag$3 = setToStringTag$8;
	var InternalStateModule$4 = internalState;

	var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var getInternalState$4 = InternalStateModule$4.get;
	var setInternalState$4 = InternalStateModule$4.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH$1 = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global$B[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE$1];
	var $DataView = global$B[DATA_VIEW];
	var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE$1];
	var ObjectPrototype$2 = Object.prototype;
	var Array$4 = global$B.Array;
	var RangeError$4 = global$B.RangeError;
	var fill = uncurryThis$o(arrayFill);
	var reverse = uncurryThis$o([].reverse);

	var packIEEE754 = IEEE754.pack;
	var unpackIEEE754 = IEEE754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter$1 = function (Constructor, key) {
	  defineProperty$7(Constructor[PROTOTYPE$1], key, { get: function () { return getInternalState$4(this)[key]; } });
	};

	var get = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex$1(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = arraySlice$8(bytes, start, start + count);
	  return isLittleEndian ? pack : reverse(pack);
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex$1(index);
	  var store = getInternalState$4(view);
	  if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
	  var bytes = getInternalState$4(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER$1) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance$4(this, ArrayBufferPrototype$1);
	    var byteLength = toIndex$1(length);
	    setInternalState$4(this, {
	      bytes: fill(Array$4(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!DESCRIPTORS$9) this.byteLength = byteLength;
	  };

	  ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE$1];

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance$4(this, DataViewPrototype$1);
	    anInstance$4(buffer, ArrayBufferPrototype$1);
	    var bufferLength = getInternalState$4(buffer).byteLength;
	    var offset = toIntegerOrInfinity$4(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$4('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength$7(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$4(WRONG_LENGTH$1);
	    setInternalState$4(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });
	    if (!DESCRIPTORS$9) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  DataViewPrototype$1 = $DataView[PROTOTYPE$1];

	  if (DESCRIPTORS$9) {
	    addGetter$1($ArrayBuffer, 'byteLength');
	    addGetter$1($DataView, 'buffer');
	    addGetter$1($DataView, 'byteLength');
	    addGetter$1($DataView, 'byteOffset');
	  }

	  redefineAll$2(DataViewPrototype$1, {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer.name !== ARRAY_BUFFER;
	  /* eslint-disable no-new -- required for testing */
	  if (!fails$q(function () {
	    NativeArrayBuffer(1);
	  }) || !fails$q(function () {
	    new NativeArrayBuffer(-1);
	  }) || fails$q(function () {
	    new NativeArrayBuffer();
	    new NativeArrayBuffer(1.5);
	    new NativeArrayBuffer(NaN);
	    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
	  })) {
	  /* eslint-enable no-new -- required for testing */
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance$4(this, ArrayBufferPrototype$1);
	      return new NativeArrayBuffer(toIndex$1(length));
	    };

	    $ArrayBuffer[PROTOTYPE$1] = ArrayBufferPrototype$1;

	    for (var keys$1 = getOwnPropertyNames$2(NativeArrayBuffer), j$2 = 0, key$1; keys$1.length > j$2;) {
	      if (!((key$1 = keys$1[j$2++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty$4($ArrayBuffer, key$1, NativeArrayBuffer[key$1]);
	      }
	    }

	    ArrayBufferPrototype$1.constructor = $ArrayBuffer;
	  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
	    createNonEnumerableProperty$4(NativeArrayBuffer, 'name', ARRAY_BUFFER);
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (setPrototypeOf$4 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$2) {
	    setPrototypeOf$4(DataViewPrototype$1, ObjectPrototype$2);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = uncurryThis$o(DataViewPrototype$1.setInt8);
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll$2(DataViewPrototype$1, {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag$3($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag$3($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var global$A = global$19;
	var isConstructor$2 = isConstructor$4;
	var tryToString$2 = tryToString$5;

	var TypeError$b = global$A.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$2 = function (argument) {
	  if (isConstructor$2(argument)) return argument;
	  throw TypeError$b(tryToString$2(argument) + ' is not a constructor');
	};

	var anObject$8 = anObject$i;
	var aConstructor$1 = aConstructor$2;
	var wellKnownSymbol$f = wellKnownSymbol$s;

	var SPECIES$6 = wellKnownSymbol$f('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$4 = function (O, defaultConstructor) {
	  var C = anObject$8(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$8(C)[SPECIES$6]) == undefined ? defaultConstructor : aConstructor$1(S);
	};

	var $$l = _export;
	var uncurryThis$n = functionUncurryThis;
	var fails$p = fails$D;
	var ArrayBufferModule$1 = arrayBuffer;
	var anObject$7 = anObject$i;
	var toAbsoluteIndex$4 = toAbsoluteIndex$8;
	var toLength$6 = toLength$a;
	var speciesConstructor$3 = speciesConstructor$4;

	var ArrayBuffer$3 = ArrayBufferModule$1.ArrayBuffer;
	var DataView$2 = ArrayBufferModule$1.DataView;
	var DataViewPrototype = DataView$2.prototype;
	var un$ArrayBufferSlice = uncurryThis$n(ArrayBuffer$3.prototype.slice);
	var getUint8$1 = uncurryThis$n(DataViewPrototype.getUint8);
	var setUint8$1 = uncurryThis$n(DataViewPrototype.setUint8);

	var INCORRECT_SLICE = fails$p(function () {
	  return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
	});

	// `ArrayBuffer.prototype.slice` method
	// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
	$$l({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (un$ArrayBufferSlice && end === undefined) {
	      return un$ArrayBufferSlice(anObject$7(this), start); // FF fix
	    }
	    var length = anObject$7(this).byteLength;
	    var first = toAbsoluteIndex$4(start, length);
	    var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
	    var result = new (speciesConstructor$3(this, ArrayBuffer$3))(toLength$6(fin - first));
	    var viewSource = new DataView$2(this);
	    var viewTarget = new DataView$2(result);
	    var index = 0;
	    while (first < fin) {
	      setUint8$1(viewTarget, index++, getUint8$1(viewSource, first++));
	    } return result;
	  }
	});

	var typedArrayConstructor = {exports: {}};

	var wellKnownSymbol$e = wellKnownSymbol$s;

	var ITERATOR$1 = wellKnownSymbol$e('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$1] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$1] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var NATIVE_ARRAY_BUFFER = arrayBufferNative;
	var DESCRIPTORS$8 = descriptors;
	var global$z = global$19;
	var isCallable$8 = isCallable$p;
	var isObject$d = isObject$k;
	var hasOwn$7 = hasOwnProperty_1;
	var classof$7 = classof$d;
	var tryToString$1 = tryToString$5;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
	var redefine$5 = redefine$d.exports;
	var defineProperty$6 = objectDefineProperty.f;
	var isPrototypeOf$5 = objectIsPrototypeOf;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$3 = objectSetPrototypeOf;
	var wellKnownSymbol$d = wellKnownSymbol$s;
	var uid$2 = uid$5;

	var Int8Array$4 = global$z.Int8Array;
	var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
	var Uint8ClampedArray$1 = global$z.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
	var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
	var ObjectPrototype$1 = Object.prototype;
	var TypeError$a = global$z.TypeError;

	var TO_STRING_TAG = wellKnownSymbol$d('toStringTag');
	var TYPED_ARRAY_TAG$1 = uid$2('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR$2 = uid$2('TYPED_ARRAY_CONSTRUCTOR');
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$3 && classof$7(global$z.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQUIRED = false;
	var NAME$1, Constructor, Prototype;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var BigIntArrayConstructorsList = {
	  BigInt64Array: 8,
	  BigUint64Array: 8
	};

	var isView = function isView(it) {
	  if (!isObject$d(it)) return false;
	  var klass = classof$7(it);
	  return klass === 'DataView'
	    || hasOwn$7(TypedArrayConstructorsList, klass)
	    || hasOwn$7(BigIntArrayConstructorsList, klass);
	};

	var isTypedArray$1 = function (it) {
	  if (!isObject$d(it)) return false;
	  var klass = classof$7(it);
	  return hasOwn$7(TypedArrayConstructorsList, klass)
	    || hasOwn$7(BigIntArrayConstructorsList, klass);
	};

	var aTypedArray$m = function (it) {
	  if (isTypedArray$1(it)) return it;
	  throw TypeError$a('Target is not a typed array');
	};

	var aTypedArrayConstructor$3 = function (C) {
	  if (isCallable$8(C) && (!setPrototypeOf$3 || isPrototypeOf$5(TypedArray$1, C))) return C;
	  throw TypeError$a(tryToString$1(C) + ' is not a typed array constructor');
	};

	var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
	  if (!DESCRIPTORS$8) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global$z[ARRAY];
	    if (TypedArrayConstructor && hasOwn$7(TypedArrayConstructor.prototype, KEY)) try {
	      delete TypedArrayConstructor.prototype[KEY];
	    } catch (error) {
	      // old WebKit bug - some methods are non-configurable
	      try {
	        TypedArrayConstructor.prototype[KEY] = property;
	      } catch (error2) { /* empty */ }
	    }
	  }
	  if (!TypedArrayPrototype$2[KEY] || forced) {
	    redefine$5(TypedArrayPrototype$2, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!DESCRIPTORS$8) return;
	  if (setPrototypeOf$3) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global$z[ARRAY];
	      if (TypedArrayConstructor && hasOwn$7(TypedArrayConstructor, KEY)) try {
	        delete TypedArrayConstructor[KEY];
	      } catch (error) { /* empty */ }
	    }
	    if (!TypedArray$1[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine$5(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global$z[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine$5(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME$1 in TypedArrayConstructorsList) {
	  Constructor = global$z[NAME$1];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) createNonEnumerableProperty$3(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
	  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
	}

	for (NAME$1 in BigIntArrayConstructorsList) {
	  Constructor = global$z[NAME$1];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) createNonEnumerableProperty$3(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$8(TypedArray$1) || TypedArray$1 === Function.prototype) {
	  // eslint-disable-next-line no-shadow -- safe
	  TypedArray$1 = function TypedArray() {
	    throw TypeError$a('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global$z[NAME$1]) setPrototypeOf$3(global$z[NAME$1], TypedArray$1);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
	  TypedArrayPrototype$2 = TypedArray$1.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global$z[NAME$1]) setPrototypeOf$3(global$z[NAME$1].prototype, TypedArrayPrototype$2);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
	  setPrototypeOf$3(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
	}

	if (DESCRIPTORS$8 && !hasOwn$7(TypedArrayPrototype$2, TO_STRING_TAG)) {
	  TYPED_ARRAY_TAG_REQUIRED = true;
	  defineProperty$6(TypedArrayPrototype$2, TO_STRING_TAG, { get: function () {
	    return isObject$d(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
	  } });
	  for (NAME$1 in TypedArrayConstructorsList) if (global$z[NAME$1]) {
	    createNonEnumerableProperty$3(global$z[NAME$1], TYPED_ARRAY_TAG$1, NAME$1);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
	  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$2,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
	  aTypedArray: aTypedArray$m,
	  aTypedArrayConstructor: aTypedArrayConstructor$3,
	  exportTypedArrayMethod: exportTypedArrayMethod$n,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray$1,
	  TypedArray: TypedArray$1,
	  TypedArrayPrototype: TypedArrayPrototype$2
	};

	/* eslint-disable no-new -- required for testing */

	var global$y = global$19;
	var fails$o = fails$D;
	var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$2 = global$y.ArrayBuffer;
	var Int8Array$3 = global$y.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$o(function () {
	  Int8Array$3(1);
	}) || !fails$o(function () {
	  new Int8Array$3(-1);
	}) || !checkCorrectnessOfIteration$3(function (iterable) {
	  new Int8Array$3();
	  new Int8Array$3(null);
	  new Int8Array$3(1.5);
	  new Int8Array$3(iterable);
	}, true) || fails$o(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$3(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});

	var isObject$c = isObject$k;

	var floor$2 = Math.floor;

	// `IsIntegralNumber` abstract operation
	// https://tc39.es/ecma262/#sec-isintegralnumber
	// eslint-disable-next-line es/no-number-isinteger -- safe
	var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
	  return !isObject$c(it) && isFinite(it) && floor$2(it) === it;
	};

	var global$x = global$19;
	var toIntegerOrInfinity$3 = toIntegerOrInfinity$9;

	var RangeError$3 = global$x.RangeError;

	var toPositiveInteger$1 = function (it) {
	  var result = toIntegerOrInfinity$3(it);
	  if (result < 0) throw RangeError$3("The argument can't be less than 0");
	  return result;
	};

	var global$w = global$19;
	var toPositiveInteger = toPositiveInteger$1;

	var RangeError$2 = global$w.RangeError;

	var toOffset$2 = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError$2('Wrong offset');
	  return offset;
	};

	var bind$6 = functionBindContext;
	var call$b = functionCall;
	var aConstructor = aConstructor$2;
	var toObject$7 = toObject$d;
	var lengthOfArrayLike$a = lengthOfArrayLike$f;
	var getIterator$1 = getIterator$4;
	var getIteratorMethod$1 = getIteratorMethod$5;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
	  var C = aConstructor(this);
	  var O = toObject$7(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod$1(O);
	  var i, length, result, step, iterator, next;
	  if (iteratorMethod && !isArrayIteratorMethod$1(iteratorMethod)) {
	    iterator = getIterator$1(O, iteratorMethod);
	    next = iterator.next;
	    O = [];
	    while (!(step = call$b(next, iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bind$6(mapfn, arguments[2]);
	  }
	  length = lengthOfArrayLike$a(O);
	  result = new (aTypedArrayConstructor$2(C))(length);
	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }
	  return result;
	};

	var classof$6 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$4 = Array.isArray || function isArray(argument) {
	  return classof$6(argument) == 'Array';
	};

	var global$v = global$19;
	var isArray$3 = isArray$4;
	var isConstructor$1 = isConstructor$4;
	var isObject$b = isObject$k;
	var wellKnownSymbol$c = wellKnownSymbol$s;

	var SPECIES$5 = wellKnownSymbol$c('species');
	var Array$3 = global$v.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$3(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$1(C) && (C === Array$3 || isArray$3(C.prototype))) C = undefined;
	    else if (isObject$b(C)) {
	      C = C[SPECIES$5];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$3 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$5 = functionBindContext;
	var uncurryThis$m = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toObject$6 = toObject$d;
	var lengthOfArrayLike$9 = lengthOfArrayLike$f;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;

	var push$4 = uncurryThis$m([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$6($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind$5(callbackfn, that);
	    var length = lengthOfArrayLike$9(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$2;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$4(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$4(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$3(7)
	};

	var getBuiltIn$2 = getBuiltIn$9;
	var definePropertyModule$2 = objectDefineProperty;
	var wellKnownSymbol$b = wellKnownSymbol$s;
	var DESCRIPTORS$7 = descriptors;

	var SPECIES$4 = wellKnownSymbol$b('species');

	var setSpecies$3 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule$2.f;

	  if (DESCRIPTORS$7 && Constructor && !Constructor[SPECIES$4]) {
	    defineProperty(Constructor, SPECIES$4, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var isCallable$7 = isCallable$p;
	var isObject$a = isObject$k;
	var setPrototypeOf$2 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$2 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$7(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$a(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$2($this, NewTargetPrototype);
	  return $this;
	};

	var $$k = _export;
	var global$u = global$19;
	var call$a = functionCall;
	var DESCRIPTORS$6 = descriptors;
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
	var ArrayBufferViewCore$n = arrayBufferViewCore;
	var ArrayBufferModule = arrayBuffer;
	var anInstance$3 = anInstance$7;
	var createPropertyDescriptor$1 = createPropertyDescriptor$7;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
	var isIntegralNumber = isIntegralNumber$1;
	var toLength$5 = toLength$a;
	var toIndex = toIndex$2;
	var toOffset$1 = toOffset$2;
	var toPropertyKey$1 = toPropertyKey$5;
	var hasOwn$6 = hasOwnProperty_1;
	var classof$5 = classof$d;
	var isObject$9 = isObject$k;
	var isSymbol$2 = isSymbol$5;
	var create$2 = objectCreate;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var typedArrayFrom = typedArrayFrom$1;
	var forEach$1 = arrayIteration.forEach;
	var setSpecies$2 = setSpecies$3;
	var definePropertyModule$1 = objectDefineProperty;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var InternalStateModule$3 = internalState;
	var inheritIfRequired$2 = inheritIfRequired$3;

	var getInternalState$3 = InternalStateModule$3.get;
	var setInternalState$3 = InternalStateModule$3.set;
	var nativeDefineProperty$1 = definePropertyModule$1.f;
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var round = Math.round;
	var RangeError$1 = global$u.RangeError;
	var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer$1.prototype;
	var DataView$1 = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_CONSTRUCTOR$1 = ArrayBufferViewCore$n.TYPED_ARRAY_CONSTRUCTOR;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore$n.TypedArray;
	var TypedArrayPrototype$1 = ArrayBufferViewCore$n.TypedArrayPrototype;
	var aTypedArrayConstructor$1 = ArrayBufferViewCore$n.aTypedArrayConstructor;
	var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var fromList = function (C, list) {
	  aTypedArrayConstructor$1(C);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var addGetter = function (it, key) {
	  nativeDefineProperty$1(it, key, { get: function () {
	    return getInternalState$3(this)[key];
	  } });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return isPrototypeOf$4(ArrayBufferPrototype, it) || (klass = classof$5(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && !isSymbol$2(key)
	    && key in target
	    && isIntegralNumber(+key)
	    && key >= 0;
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  key = toPropertyKey$1(key);
	  return isTypedArrayIndex(target, key)
	    ? createPropertyDescriptor$1(2, target[key])
	    : nativeGetOwnPropertyDescriptor$1(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  key = toPropertyKey$1(key);
	  if (isTypedArrayIndex(target, key)
	    && isObject$9(descriptor)
	    && hasOwn$6(descriptor, 'value')
	    && !hasOwn$6(descriptor, 'get')
	    && !hasOwn$6(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!hasOwn$6(descriptor, 'writable') || descriptor.writable)
	    && (!hasOwn$6(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty$1(target, key, descriptor);
	};

	if (DESCRIPTORS$6) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    getOwnPropertyDescriptorModule$1.f = wrappedGetOwnPropertyDescriptor;
	    definePropertyModule$1.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype$1, 'buffer');
	    addGetter(TypedArrayPrototype$1, 'byteOffset');
	    addGetter(TypedArrayPrototype$1, 'byteLength');
	    addGetter(TypedArrayPrototype$1, 'length');
	  }

	  $$k({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+$/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global$u[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState$3(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState$3(that);
	      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty$1(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance$3(that, TypedArrayConstructorPrototype);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject$9(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer$1(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset$1(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$5($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return call$a(typedArrayFrom, TypedArrayConstructor, data);
	        }
	        setInternalState$3(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView$1(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$2(TypedArrayPrototype$1);
	    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance$3(dummy, TypedArrayConstructorPrototype);
	        return inheritIfRequired$2(function () {
	          if (!isObject$9(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return call$a(typedArrayFrom, TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
	      forEach$1(getOwnPropertyNames$1(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty$2(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    createNonEnumerableProperty$2(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR$1, TypedArrayConstructor);

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    $$k({
	      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty$2(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies$2(CONSTRUCTOR_NAME);
	  };
	} else typedArrayConstructor.exports = function () { /* empty */ };

	var createTypedArrayConstructor$2 = typedArrayConstructor.exports;

	// `Uint8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$2('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var toObject$5 = toObject$d;
	var toAbsoluteIndex$3 = toAbsoluteIndex$8;
	var lengthOfArrayLike$8 = lengthOfArrayLike$f;

	var min$6 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.copywithin
	// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject$5(this);
	  var len = lengthOfArrayLike$8(O);
	  var to = toAbsoluteIndex$3(target, len);
	  var from = toAbsoluteIndex$3(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$6((end === undefined ? len : toAbsoluteIndex$3(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var uncurryThis$l = functionUncurryThis;
	var ArrayBufferViewCore$m = arrayBufferViewCore;
	var $ArrayCopyWithin = arrayCopyWithin;

	var u$ArrayCopyWithin = uncurryThis$l($ArrayCopyWithin);
	var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
	var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
	  return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var ArrayBufferViewCore$l = arrayBufferViewCore;
	var $every = arrayIteration.every;

	var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
	var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$k = arrayBufferViewCore;
	var call$9 = functionCall;
	var $fill = arrayFill$1;

	var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
	var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;

	// `%TypedArray%.prototype.fill` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
	exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
	  var length = arguments.length;
	  return call$9(
	    $fill,
	    aTypedArray$j(this),
	    value,
	    length > 1 ? arguments[1] : undefined,
	    length > 2 ? arguments[2] : undefined
	  );
	});

	var lengthOfArrayLike$7 = lengthOfArrayLike$f;

	var arrayFromConstructorAndList$1 = function (Constructor, list) {
	  var index = 0;
	  var length = lengthOfArrayLike$7(list);
	  var result = new Constructor(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var ArrayBufferViewCore$j = arrayBufferViewCore;
	var speciesConstructor$2 = speciesConstructor$4;

	var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$j.TYPED_ARRAY_CONSTRUCTOR;
	var aTypedArrayConstructor = ArrayBufferViewCore$j.aTypedArrayConstructor;

	// a part of `TypedArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#typedarray-species-create
	var typedArraySpeciesConstructor$4 = function (originalArray) {
	  return aTypedArrayConstructor(speciesConstructor$2(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
	};

	var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
	var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

	var typedArrayFromSpeciesAndList = function (instance, list) {
	  return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
	};

	var ArrayBufferViewCore$i = arrayBufferViewCore;
	var $filter$1 = arrayIteration.filter;
	var fromSpeciesAndList = typedArrayFromSpeciesAndList;

	var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
	var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter$1(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  return fromSpeciesAndList(this, list);
	});

	var ArrayBufferViewCore$h = arrayBufferViewCore;
	var $find$1 = arrayIteration.find;

	var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
	var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
	  return $find$1(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$g = arrayBufferViewCore;
	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
	var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$f = arrayBufferViewCore;
	var $forEach$2 = arrayIteration.forEach;

	var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
	var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach$2(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$e = arrayBufferViewCore;
	var $includes = arrayIncludes.includes;

	var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
	var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$d = arrayBufferViewCore;
	var $indexOf = arrayIncludes.indexOf;

	var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
	var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$t = global$19;
	var fails$n = fails$D;
	var uncurryThis$k = functionUncurryThis;
	var ArrayBufferViewCore$c = arrayBufferViewCore;
	var ArrayIterators = es_array_iterator;
	var wellKnownSymbol$a = wellKnownSymbol$s;

	var ITERATOR = wellKnownSymbol$a('iterator');
	var Uint8Array$2 = global$t.Uint8Array;
	var arrayValues = uncurryThis$k(ArrayIterators.values);
	var arrayKeys = uncurryThis$k(ArrayIterators.keys);
	var arrayEntries = uncurryThis$k(ArrayIterators.entries);
	var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
	var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
	var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;

	var GENERIC = !fails$n(function () {
	  TypedArrayPrototype[ITERATOR].call([1]);
	});

	var ITERATOR_IS_VALUES = !!TypedArrayPrototype
	  && TypedArrayPrototype.values
	  && TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values
	  && TypedArrayPrototype.values.name === 'values';

	var typedArrayValues = function values() {
	  return arrayValues(aTypedArray$c(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$d('entries', function entries() {
	  return arrayEntries(aTypedArray$c(this));
	}, GENERIC);
	// `%TypedArray%.prototype.keys` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$d('keys', function keys() {
	  return arrayKeys(aTypedArray$c(this));
	}, GENERIC);
	// `%TypedArray%.prototype.values` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$d(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

	var ArrayBufferViewCore$b = arrayBufferViewCore;
	var uncurryThis$j = functionUncurryThis;

	var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
	var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
	var $join = uncurryThis$j([].join);

	// `%TypedArray%.prototype.join` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
	exportTypedArrayMethod$c('join', function join(separator) {
	  return $join(aTypedArray$b(this), separator);
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$7 = FunctionPrototype$1.apply;
	var call$8 = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$8.bind(apply$7) : function () {
	  return call$8.apply(apply$7, arguments);
	});

	var fails$m = fails$D;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$m(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	/* eslint-disable es/no-array-prototype-lastindexof -- safe */
	var apply$6 = functionApply;
	var toIndexedObject$5 = toIndexedObject$b;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$9;
	var lengthOfArrayLike$6 = lengthOfArrayLike$f;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var min$5 = Math.min;
	var $lastIndexOf$1 = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('lastIndexOf');
	var FORCED$5 = NEGATIVE_ZERO || !STRICT_METHOD$1;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$5 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return apply$6($lastIndexOf$1, this, arguments) || 0;
	  var O = toIndexedObject$5(this);
	  var length = lengthOfArrayLike$6(O);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$5(index, toIntegerOrInfinity$2(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : $lastIndexOf$1;

	var ArrayBufferViewCore$a = arrayBufferViewCore;
	var apply$5 = functionApply;
	var $lastIndexOf = arrayLastIndexOf;

	var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
	var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
	exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  var length = arguments.length;
	  return apply$5($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
	});

	var ArrayBufferViewCore$9 = arrayBufferViewCore;
	var $map$1 = arrayIteration.map;
	var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

	var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
	var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
	  return $map$1(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (typedArraySpeciesConstructor$2(O))(length);
	  });
	});

	var global$s = global$19;
	var aCallable$3 = aCallable$7;
	var toObject$4 = toObject$d;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$5 = lengthOfArrayLike$f;

	var TypeError$9 = global$s.TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable$3(callbackfn);
	    var O = toObject$4(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$5(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError$9('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var ArrayBufferViewCore$8 = arrayBufferViewCore;
	var $reduce = arrayReduce.left;

	var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
	var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$7 = arrayBufferViewCore;
	var $reduceRight = arrayReduce.right;

	var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
	var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$6 = arrayBufferViewCore;

	var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
	var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
	var floor$1 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$7('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$6(that).length;
	  var middle = floor$1(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var global$r = global$19;
	var call$7 = functionCall;
	var ArrayBufferViewCore$5 = arrayBufferViewCore;
	var lengthOfArrayLike$4 = lengthOfArrayLike$f;
	var toOffset = toOffset$2;
	var toIndexedObject$4 = toObject$d;
	var fails$l = fails$D;

	var RangeError = global$r.RangeError;
	var Int8Array$2 = global$r.Int8Array;
	var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
	var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

	var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails$l(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  var array = new Uint8ClampedArray(2);
	  call$7($set, array, { length: 1, 0: 3 }, 1);
	  return array[1] !== 3;
	});

	// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$l(function () {
	  var array = new Int8Array$2(2);
	  array.set(1);
	  array.set('2', 1);
	  return array[0] !== 0 || array[1] !== 2;
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
	  aTypedArray$5(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var src = toIndexedObject$4(arrayLike);
	  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call$7($set, this, src, offset);
	  var length = this.length;
	  var len = lengthOfArrayLike$4(src);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

	var uncurryThis$i = functionUncurryThis;

	var arraySlice$7 = uncurryThis$i([].slice);

	var ArrayBufferViewCore$4 = arrayBufferViewCore;
	var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
	var fails$k = fails$D;
	var arraySlice$6 = arraySlice$7;

	var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
	var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

	var FORCED$4 = fails$k(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$5('slice', function slice(start, end) {
	  var list = arraySlice$6(aTypedArray$4(this), start, end);
	  var C = typedArraySpeciesConstructor$1(this);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$4);

	var ArrayBufferViewCore$3 = arrayBufferViewCore;
	var $some = arrayIteration.some;

	var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
	var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var userAgent$4 = engineUserAgent;

	var firefox = userAgent$4.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var UA = engineUserAgent;

	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent$3 = engineUserAgent;

	var webkit = userAgent$3.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var global$q = global$19;
	var uncurryThis$h = functionUncurryThis;
	var fails$j = fails$D;
	var aCallable$2 = aCallable$7;
	var internalSort = arraySort$1;
	var ArrayBufferViewCore$2 = arrayBufferViewCore;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8 = engineV8Version;
	var WEBKIT = engineWebkitVersion;

	var Array$2 = global$q.Array;
	var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
	var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
	var Uint16Array$1 = global$q.Uint16Array;
	var un$Sort = Uint16Array$1 && uncurryThis$h(Uint16Array$1.prototype.sort);

	// WebKit
	var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails$j(function () {
	  un$Sort(new Uint16Array$1(2), null);
	}) && fails$j(function () {
	  un$Sort(new Uint16Array$1(2), {});
	}));

	var STABLE_SORT = !!un$Sort && !fails$j(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 74;
	  if (FF) return FF < 67;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 602;

	  var array = new Uint16Array$1(516);
	  var expected = Array$2(516);
	  var index, mod;

	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  un$Sort(array, function (a, b) {
	    return (a / 4 | 0) - (b / 4 | 0);
	  });

	  for (index = 0; index < 516; index++) {
	    if (array[index] !== expected[index]) return true;
	  }
	});

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (y !== y) return -1;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (x !== x) return 1;
	    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
	    return x > y;
	  };
	};

	// `%TypedArray%.prototype.sort` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$3('sort', function sort(comparefn) {
	  if (comparefn !== undefined) aCallable$2(comparefn);
	  if (STABLE_SORT) return un$Sort(this, comparefn);

	  return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
	}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

	var ArrayBufferViewCore$1 = arrayBufferViewCore;
	var toLength$4 = toLength$a;
	var toAbsoluteIndex$2 = toAbsoluteIndex$8;
	var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

	var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
	var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
	  var O = aTypedArray$1(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex$2(begin, length);
	  var C = typedArraySpeciesConstructor(O);
	  return new C(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength$4((end === undefined ? length : toAbsoluteIndex$2(end, length)) - beginIndex)
	  );
	});

	var global$p = global$19;
	var apply$4 = functionApply;
	var ArrayBufferViewCore = arrayBufferViewCore;
	var fails$i = fails$D;
	var arraySlice$5 = arraySlice$7;

	var Int8Array$1 = global$p.Int8Array;
	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$i(function () {
	  $toLocaleString.call(new Int8Array$1(1));
	});

	var FORCED$3 = fails$i(function () {
	  return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
	}) || !fails$i(function () {
	  Int8Array$1.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
	  return apply$4(
	    $toLocaleString,
	    TO_LOCALE_STRING_BUG ? arraySlice$5(aTypedArray(this)) : aTypedArray(this),
	    arraySlice$5(arguments)
	  );
	}, FORCED$3);

	var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
	var fails$h = fails$D;
	var global$o = global$19;
	var uncurryThis$g = functionUncurryThis;

	var Uint8Array$1 = global$o.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
	var arrayToString = [].toString;
	var join = uncurryThis$g([].join);

	if (fails$h(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return join(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var global$n = global$19;

	var nativePromiseConstructor = global$n.Promise;

	var global$m = global$19;
	var bind$4 = functionBindContext;
	var call$6 = functionCall;
	var anObject$6 = anObject$i;
	var tryToString = tryToString$5;
	var isArrayIteratorMethod = isArrayIteratorMethod$3;
	var lengthOfArrayLike$3 = lengthOfArrayLike$f;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var getIterator = getIterator$4;
	var getIteratorMethod = getIteratorMethod$5;
	var iteratorClose = iteratorClose$2;

	var TypeError$8 = global$m.TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$4 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$4(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$6(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw TypeError$8(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$3(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$3(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = call$6(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$3(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var userAgent$2 = engineUserAgent;

	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

	var classof$4 = classofRaw$1;
	var global$l = global$19;

	var engineIsNode = classof$4(global$l.process) == 'process';

	var global$k = global$19;
	var apply$3 = functionApply;
	var bind$3 = functionBindContext;
	var isCallable$6 = isCallable$p;
	var hasOwn$5 = hasOwnProperty_1;
	var fails$g = fails$D;
	var html = html$2;
	var arraySlice$4 = arraySlice$7;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength = validateArgumentsLength$3;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$2 = engineIsNode;

	var set = global$k.setImmediate;
	var clear = global$k.clearImmediate;
	var process$2 = global$k.process;
	var Dispatch = global$k.Dispatch;
	var Function$1 = global$k.Function;
	var MessageChannel = global$k.MessageChannel;
	var String$1 = global$k.String;
	var counter = 0;
	var queue$1 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var location, defer, channel, port;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  location = global$k.location;
	} catch (error) { /* empty */ }

	var run = function (id) {
	  if (hasOwn$5(queue$1, id)) {
	    var fn = queue$1[id];
	    delete queue$1[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global$k.postMessage(String$1(id), location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength(arguments.length, 1);
	    var fn = isCallable$6(handler) ? handler : Function$1(handler);
	    var args = arraySlice$4(arguments, 1);
	    queue$1[++counter] = function () {
	      apply$3(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$1[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$2) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bind$3(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$k.addEventListener &&
	    isCallable$6(global$k.postMessage) &&
	    !global$k.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$g(post)
	  ) {
	    defer = post;
	    global$k.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var userAgent$1 = engineUserAgent;
	var global$j = global$19;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$j.Pebble !== undefined;

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$i = global$19;
	var bind$2 = functionBindContext;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$1 = engineIsNode;

	var MutationObserver = global$i.MutationObserver || global$i.WebKitMutationObserver;
	var document$2 = global$i.document;
	var process$1 = global$i.process;
	var Promise$1 = global$i.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global$i, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$2(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$1) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask = bind$2(macrotask, global$i);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }
	}

	var microtask$1 = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var newPromiseCapability$2 = {};

	var aCallable$1 = aCallable$7;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$1(resolve);
	  this.reject = aCallable$1(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var anObject$5 = anObject$i;
	var isObject$8 = isObject$k;
	var newPromiseCapability$1 = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$5(C);
	  if (isObject$8(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$h = global$19;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$h.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$1 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue$1 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$1.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue = Queue$1;

	var engineIsBrowser = typeof window == 'object';

	var $$j = _export;
	var global$g = global$19;
	var getBuiltIn$1 = getBuiltIn$9;
	var call$5 = functionCall;
	var NativePromise = nativePromiseConstructor;
	var redefine$4 = redefine$d.exports;
	var redefineAll$1 = redefineAll$4;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag$2 = setToStringTag$8;
	var setSpecies$1 = setSpecies$3;
	var aCallable = aCallable$7;
	var isCallable$5 = isCallable$p;
	var isObject$7 = isObject$k;
	var anInstance$2 = anInstance$7;
	var inspectSource = inspectSource$4;
	var iterate$3 = iterate$4;
	var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
	var speciesConstructor$1 = speciesConstructor$4;
	var task = task$1.set;
	var microtask = microtask$1;
	var promiseResolve = promiseResolve$1;
	var hostReportErrors = hostReportErrors$1;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var perform = perform$1;
	var Queue = queue;
	var InternalStateModule$2 = internalState;
	var isForced$2 = isForced_1;
	var wellKnownSymbol$9 = wellKnownSymbol$s;
	var IS_BROWSER = engineIsBrowser;
	var IS_NODE = engineIsNode;
	var V8_VERSION$2 = engineV8Version;

	var SPECIES$3 = wellKnownSymbol$9('species');
	var PROMISE = 'Promise';

	var getInternalState$2 = InternalStateModule$2.getterFor(PROMISE);
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalPromiseState = InternalStateModule$2.getterFor(PROMISE);
	var NativePromisePrototype = NativePromise && NativePromise.prototype;
	var PromiseConstructor = NativePromise;
	var PromisePrototype = NativePromisePrototype;
	var TypeError$7 = global$g.TypeError;
	var document$1 = global$g.document;
	var process = global$g.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$g.dispatchEvent);
	var NATIVE_REJECTION_EVENT = isCallable$5(global$g.PromiseRejectionEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var SUBCLASSING = false;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$2 = isForced$2(PROMISE, function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (V8_VERSION$2 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$3] = FakePromise;
	  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
	});

	var INCORRECT_ITERATION$1 = FORCED$2 || !checkCorrectnessOfIteration$2(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$7(it) && isCallable$5(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(TypeError$7('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$5(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$g.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$g['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$5(task, global$g, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$5(task, global$g, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$1 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$7("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call$5(then, value,
	            bind$1(internalResolve, wrapper, state),
	            bind$1(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$2) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance$2(this, PromisePrototype);
	    aCallable(executor);
	    call$5(Internal, this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  PromisePrototype = PromiseConstructor.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$2(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll$1(PromisePrototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    // eslint-disable-next-line unicorn/no-thenable -- safe
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
	      state.parent = true;
	      reaction.ok = isCallable$5(onFulfilled) ? onFulfilled : true;
	      reaction.fail = isCallable$5(onRejected) && onRejected;
	      reaction.domain = IS_NODE ? process.domain : undefined;
	      if (state.state == PENDING) state.reactions.add(reaction);
	      else microtask(function () {
	        callReaction(reaction, state);
	      });
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind$1(internalResolve, state);
	    this.reject = bind$1(internalReject, state);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$5(NativePromise) && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      redefine$4(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$5(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });

	      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	      redefine$4(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromisePrototype);
	    }
	  }
	}

	$$j({ global: true, wrap: true, forced: FORCED$2 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag$2(PromiseConstructor, PROMISE, false);
	setSpecies$1(PROMISE);

	PromiseWrapper = getBuiltIn$1(PROMISE);

	// statics
	$$j({ target: PROMISE, stat: true, forced: FORCED$2 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    call$5(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	$$j({ target: PROMISE, stat: true, forced: FORCED$2 }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	$$j({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$3(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$5($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate$3(iterable, function (promise) {
	        call$5($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var streamCodecShim = (function (library) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var registerDataHandler = arguments.length > 2 ? arguments[2] : undefined;
	  return {
	    Deflate: createCodecClass(library.Deflate, options.deflate, registerDataHandler),
	    Inflate: createCodecClass(library.Inflate, options.inflate, registerDataHandler)
	  };
	});

	function createCodecClass(constructor, constructorOptions, registerDataHandler) {
	  return /*#__PURE__*/function () {
	    function _class(options) {
	      _classCallCheck(this, _class);

	      var codecAdapter = this;

	      var onData = function onData(data) {
	        if (codecAdapter.pendingData) {
	          var pendingData = codecAdapter.pendingData;
	          codecAdapter.pendingData = new Uint8Array(pendingData.length + data.length);
	          codecAdapter.pendingData.set(pendingData, 0);
	          codecAdapter.pendingData.set(data, pendingData.length);
	        } else {
	          codecAdapter.pendingData = new Uint8Array(data);
	        }
	      };

	      codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
	      registerDataHandler(codecAdapter.codec, onData);
	    }

	    _createClass(_class, [{
	      key: "append",
	      value: function append(data) {
	        try {
	          var _this2 = this;

	          _this2.codec.push(data);

	          return _await(getResponse(_this2));
	        } catch (e) {
	          return Promise.reject(e);
	        }
	      }
	    }, {
	      key: "flush",
	      value: function flush() {
	        try {
	          var _this4 = this;

	          _this4.codec.push(new Uint8Array(0), true);

	          return _await(getResponse(_this4));
	        } catch (e) {
	          return Promise.reject(e);
	        }
	      }
	    }]);

	    return _class;
	  }();

	  function getResponse(codec) {
	    if (codec.pendingData) {
	      var output = codec.pendingData;
	      codec.pendingData = null;
	      return output;
	    } else {
	      return new Uint8Array(0);
	    }
	  }
	}

	var $$i = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$2;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$i({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var fails$f = fails$D;
	var wellKnownSymbol$8 = wellKnownSymbol$s;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$2 = wellKnownSymbol$8('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$f(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$2] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$h = _export;
	var global$f = global$19;
	var toAbsoluteIndex$1 = toAbsoluteIndex$8;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$9;
	var lengthOfArrayLike$2 = lengthOfArrayLike$f;
	var toObject$3 = toObject$d;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;
	var createProperty$3 = createProperty$6;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('splice');

	var TypeError$6 = global$f.TypeError;
	var max$2 = Math.max;
	var min$4 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$h({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$3(this);
	    var len = lengthOfArrayLike$2(O);
	    var actualStart = toAbsoluteIndex$1(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$4(max$2(toIntegerOrInfinity$1(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError$6(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate$1(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$3(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var global$e = global$19;

	var globalIsFinite = global$e.isFinite;

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	// eslint-disable-next-line es/no-number-isfinite -- safe
	var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
	  return typeof it == 'number' && globalIsFinite(it);
	};

	var $$g = _export;
	var numberIsFinite = numberIsFinite$1;

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	$$g({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

	var uncurryThis$f = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$f(1.0.valueOf);

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$e = functionUncurryThis;
	var requireObjectCoercible$4 = requireObjectCoercible$8;
	var toString$6 = toString$9;
	var whitespaces$1 = whitespaces$2;

	var replace$3 = uncurryThis$e(''.replace);
	var whitespace = '[' + whitespaces$1 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$1 = function (TYPE) {
	  return function ($this) {
	    var string = toString$6(requireObjectCoercible$4($this));
	    if (TYPE & 1) string = replace$3(string, ltrim, '');
	    if (TYPE & 2) string = replace$3(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$1(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$1(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$1(3)
	};

	var DESCRIPTORS$5 = descriptors;
	var global$d = global$19;
	var uncurryThis$d = functionUncurryThis;
	var isForced$1 = isForced_1;
	var redefine$3 = redefine$d.exports;
	var hasOwn$4 = hasOwnProperty_1;
	var inheritIfRequired$1 = inheritIfRequired$3;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var isSymbol$1 = isSymbol$5;
	var toPrimitive = toPrimitive$2;
	var fails$e = fails$D;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$5 = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$d[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$5 = global$d.TypeError;
	var arraySlice$3 = uncurryThis$d(''.slice);
	var charCodeAt = uncurryThis$d(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol$1(it)) throw TypeError$5('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = charCodeAt(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt(it, 1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = arraySlice$3(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	if (isForced$1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	    var dummy = this;
	    // check on 1..constructor(foo) case
	    return isPrototypeOf$2(NumberPrototype, dummy) && fails$e(function () { thisNumberValue(dummy); })
	      ? inheritIfRequired$1(Object(n), dummy, NumberWrapper) : n;
	  };
	  for (var keys = DESCRIPTORS$5 ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (hasOwn$4(NativeNumber, key = keys[j$1]) && !hasOwn$4(NumberWrapper, key)) {
	      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine$3(global$d, NUMBER, NumberWrapper);
	}

	var $$f = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$f({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $forEach$1 = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$c = global$19;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(global$c[COLLECTION_NAME] && global$c[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var isObject$6 = isObject$k;
	var classof$3 = classofRaw$1;
	var wellKnownSymbol$7 = wellKnownSymbol$s;

	var MATCH$1 = wellKnownSymbol$7('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$6(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$3(it) == 'RegExp');
	};

	var global$b = global$19;
	var isRegExp$1 = isRegexp;

	var TypeError$4 = global$b.TypeError;

	var notARegexp = function (it) {
	  if (isRegExp$1(it)) {
	    throw TypeError$4("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$6 = wellKnownSymbol$s;

	var MATCH = wellKnownSymbol$6('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$e = _export;
	var uncurryThis$c = functionUncurryThis;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var toLength$3 = toLength$a;
	var toString$5 = toString$9;
	var notARegExp$1 = notARegexp;
	var requireObjectCoercible$3 = requireObjectCoercible$8;
	var correctIsRegExpLogic$1 = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-startswith -- safe
	var un$StartsWith = uncurryThis$c(''.startsWith);
	var stringSlice$5 = uncurryThis$c(''.slice);
	var min$3 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$1('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
	  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$e({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$5(requireObjectCoercible$3(this));
	    notARegExp$1(searchString);
	    var index = toLength$3(min$3(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$5(searchString);
	    return un$StartsWith
	      ? un$StartsWith(that, search, index)
	      : stringSlice$5(that, index, index + search.length) === search;
	  }
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var table = [];

	for (var i = 0; i < 256; i++) {
	  var t = i;

	  for (var j = 0; j < 8; j++) {
	    if (t & 1) {
	      t = t >>> 1 ^ 0xEDB88320;
	    } else {
	      t = t >>> 1;
	    }
	  }

	  table[i] = t;
	}

	var Crc32 = /*#__PURE__*/function () {
	  function Crc32(crc) {
	    _classCallCheck(this, Crc32);

	    this.crc = crc || -1;
	  }

	  _createClass(Crc32, [{
	    key: "append",
	    value: function append(data) {
	      var crc = this.crc | 0;

	      for (var offset = 0, length = data.length | 0; offset < length; offset++) {
	        crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 0xFF];
	      }

	      this.crc = crc;
	    }
	  }, {
	    key: "get",
	    value: function get() {
	      return ~this.crc;
	    }
	  }]);

	  return Crc32;
	}();

	var $$d = _export;
	var from = arrayFrom$1;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration$1(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$d({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});

	function encodeText(value) {
	  if (typeof TextEncoder == "undefined") {
	    value = unescape(encodeURIComponent(value));
	    var result = new Uint8Array(value.length);

	    for (var i = 0; i < result.length; i++) {
	      result[i] = value.charCodeAt(i);
	    }

	    return result;
	  } else {
	    return new TextEncoder().encode(value);
	  }
	}

	var $$c = _export;
	var global$a = global$19;
	var fails$d = fails$D;
	var isArray$2 = isArray$4;
	var isObject$5 = isObject$k;
	var toObject$2 = toObject$d;
	var lengthOfArrayLike$1 = lengthOfArrayLike$f;
	var createProperty$2 = createProperty$6;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$5 = wellKnownSymbol$s;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$3 = global$a.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$d(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$5(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$2(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$c({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$1(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$3(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$2(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $$b = _export;
	var global$9 = global$19;
	var isArray$1 = isArray$4;
	var isConstructor = isConstructor$4;
	var isObject$4 = isObject$k;
	var toAbsoluteIndex = toAbsoluteIndex$8;
	var lengthOfArrayLike = lengthOfArrayLike$f;
	var toIndexedObject$3 = toIndexedObject$b;
	var createProperty$1 = createProperty$6;
	var wellKnownSymbol$4 = wellKnownSymbol$s;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
	var un$Slice = arraySlice$7;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');

	var SPECIES$1 = wellKnownSymbol$4('species');
	var Array$1 = global$9.Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$3(this);
	    var length = lengthOfArrayLike(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$1(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$1(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$4(Constructor)) {
	        Constructor = Constructor[SPECIES$1];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array$1 || Constructor === undefined) {
	        return un$Slice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var createTypedArrayConstructor$1 = typedArrayConstructor.exports;

	// `Uint32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$1('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js

	/** @fileOverview Javascript cryptography implementation.
	 *
	 * Crush to remove comments, shorten variable names and
	 * generally reduce transmission size.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

	/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bits, encoded as arrays of Numbers.
	 * @namespace
	 * @description
	 * <p>
	 * These objects are the currency accepted by SJCL's crypto functions.
	 * </p>
	 *
	 * <p>
	 * Most of our crypto primitives operate on arrays of 4-byte words internally,
	 * but many of them can take arguments that are not a multiple of 4 bytes.
	 * This library encodes arrays of bits (whose size need not be a multiple of 8
	 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
	 * array of words, 32 bits at a time.  Since the words are double-precision
	 * floating point numbers, they fit some extra data.  We use this (in a private,
	 * possibly-changing manner) to encode the number of bits actually  present
	 * in the last word of the array.
	 * </p>
	 *
	 * <p>
	 * Because bitwise ops clear this out-of-band data, these arrays can be passed
	 * to ciphers like AES which want arrays of words.
	 * </p>
	 */
	var bitArray = {
	  /**
	   * Concatenate two bit arrays.
	   * @param {bitArray} a1 The first array.
	   * @param {bitArray} a2 The second array.
	   * @return {bitArray} The concatenation of a1 and a2.
	   */
	  concat: function concat(a1, a2) {
	    if (a1.length === 0 || a2.length === 0) {
	      return a1.concat(a2);
	    }

	    var last = a1[a1.length - 1],
	        shift = bitArray.getPartial(last);

	    if (shift === 32) {
	      return a1.concat(a2);
	    } else {
	      return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
	    }
	  },

	  /**
	   * Find the length of an array of bits.
	   * @param {bitArray} a The array.
	   * @return {Number} The length of a, in bits.
	   */
	  bitLength: function bitLength(a) {
	    var l = a.length;

	    if (l === 0) {
	      return 0;
	    }

	    var x = a[l - 1];
	    return (l - 1) * 32 + bitArray.getPartial(x);
	  },

	  /**
	   * Truncate an array.
	   * @param {bitArray} a The array.
	   * @param {Number} len The length to truncate to, in bits.
	   * @return {bitArray} A new array, truncated to len bits.
	   */
	  clamp: function clamp(a, len) {
	    if (a.length * 32 < len) {
	      return a;
	    }

	    a = a.slice(0, Math.ceil(len / 32));
	    var l = a.length;
	    len = len & 31;

	    if (l > 0 && len) {
	      a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> len - 1, 1);
	    }

	    return a;
	  },

	  /**
	   * Make a partial word for a bit array.
	   * @param {Number} len The number of bits in the word.
	   * @param {Number} x The bits.
	   * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
	   * @return {Number} The partial word.
	   */
	  partial: function partial(len, x, _end) {
	    if (len === 32) {
	      return x;
	    }

	    return (_end ? x | 0 : x << 32 - len) + len * 0x10000000000;
	  },

	  /**
	   * Get the number of bits used by a partial word.
	   * @param {Number} x The partial word.
	   * @return {Number} The number of bits used by the partial word.
	   */
	  getPartial: function getPartial(x) {
	    return Math.round(x / 0x10000000000) || 32;
	  },

	  /** Shift an array right.
	   * @param {bitArray} a The array to shift.
	   * @param {Number} shift The number of bits to shift.
	   * @param {Number} [carry=0] A byte to carry in
	   * @param {bitArray} [out=[]] An array to prepend to the output.
	   * @private
	   */
	  _shiftRight: function _shiftRight(a, shift, carry, out) {
	    if (out === undefined) {
	      out = [];
	    }

	    for (; shift >= 32; shift -= 32) {
	      out.push(carry);
	      carry = 0;
	    }

	    if (shift === 0) {
	      return out.concat(a);
	    }

	    for (var i = 0; i < a.length; i++) {
	      out.push(carry | a[i] >>> shift);
	      carry = a[i] << 32 - shift;
	    }

	    var last2 = a.length ? a[a.length - 1] : 0;
	    var shift2 = bitArray.getPartial(last2);
	    out.push(bitArray.partial(shift + shift2 & 31, shift + shift2 > 32 ? carry : out.pop(), 1));
	    return out;
	  }
	};
	/** @fileOverview Bit array codec implementations.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/**
	 * Arrays of bytes
	 * @namespace
	 */

	var codec = {
	  bytes: {
	    /** Convert from a bitArray to an array of bytes. */
	    fromBits: function fromBits(arr) {
	      var bl = bitArray.bitLength(arr);
	      var byteLength = bl / 8;
	      var out = new Uint8Array(byteLength);
	      var tmp;

	      for (var i = 0; i < byteLength; i++) {
	        if ((i & 3) === 0) {
	          tmp = arr[i / 4];
	        }

	        out[i] = tmp >>> 24;
	        tmp <<= 8;
	      }

	      return out;
	    },

	    /** Convert from an array of bytes to a bitArray. */
	    toBits: function toBits(bytes) {
	      var out = [];
	      var i;
	      var tmp = 0;

	      for (i = 0; i < bytes.length; i++) {
	        tmp = tmp << 8 | bytes[i];

	        if ((i & 3) === 3) {
	          out.push(tmp);
	          tmp = 0;
	        }
	      }

	      if (i & 3) {
	        out.push(bitArray.partial(8 * (i & 3), tmp));
	      }

	      return out;
	    }
	  }
	};
	var hash = {};
	/**
	 * Context for a SHA-1 operation in progress.
	 * @constructor
	 */

	hash.sha1 = function (hash) {
	  if (hash) {
	    this._h = hash._h.slice(0);
	    this._buffer = hash._buffer.slice(0);
	    this._length = hash._length;
	  } else {
	    this.reset();
	  }
	};

	hash.sha1.prototype = {
	  /**
	   * The hash's block size, in bits.
	   * @constant
	   */
	  blockSize: 512,

	  /**
	   * Reset the hash state.
	   * @return this
	   */
	  reset: function reset() {
	    var sha1 = this;
	    sha1._h = this._init.slice(0);
	    sha1._buffer = [];
	    sha1._length = 0;
	    return sha1;
	  },

	  /**
	   * Input several words to the hash.
	   * @param {bitArray|String} data the data to hash.
	   * @return this
	   */
	  update: function update(data) {
	    var sha1 = this;

	    if (typeof data === "string") {
	      data = codec.utf8String.toBits(data);
	    }

	    var b = sha1._buffer = bitArray.concat(sha1._buffer, data);
	    var ol = sha1._length;
	    var nl = sha1._length = ol + bitArray.bitLength(data);

	    if (nl > 9007199254740991) {
	      throw new Error("Cannot hash more than 2^53 - 1 bits");
	    }

	    var c = new Uint32Array(b);
	    var j = 0;

	    for (var i = sha1.blockSize + ol - (sha1.blockSize + ol & sha1.blockSize - 1); i <= nl; i += sha1.blockSize) {
	      sha1._block(c.subarray(16 * j, 16 * (j + 1)));

	      j += 1;
	    }

	    b.splice(0, 16 * j);
	    return sha1;
	  },

	  /**
	   * Complete hashing and output the hash value.
	   * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
	   */
	  finalize: function finalize() {
	    var sha1 = this;
	    var b = sha1._buffer;
	    var h = sha1._h; // Round out and push the buffer

	    b = bitArray.concat(b, [bitArray.partial(1, 1)]); // Round out the buffer to a multiple of 16 words, less the 2 length words.

	    for (var i = b.length + 2; i & 15; i++) {
	      b.push(0);
	    } // append the length


	    b.push(Math.floor(sha1._length / 0x100000000));
	    b.push(sha1._length | 0);

	    while (b.length) {
	      sha1._block(b.splice(0, 16));
	    }

	    sha1.reset();
	    return h;
	  },

	  /**
	   * The SHA-1 initialization vector.
	   * @private
	   */
	  _init: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],

	  /**
	   * The SHA-1 hash key.
	   * @private
	   */
	  _key: [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],

	  /**
	   * The SHA-1 logical functions f(0), f(1), ..., f(79).
	   * @private
	   */
	  _f: function _f(t, b, c, d) {
	    if (t <= 19) {
	      return b & c | ~b & d;
	    } else if (t <= 39) {
	      return b ^ c ^ d;
	    } else if (t <= 59) {
	      return b & c | b & d | c & d;
	    } else if (t <= 79) {
	      return b ^ c ^ d;
	    }
	  },

	  /**
	   * Circular left-shift operator.
	   * @private
	   */
	  _S: function _S(n, x) {
	    return x << n | x >>> 32 - n;
	  },

	  /**
	   * Perform one cycle of SHA-1.
	   * @param {Uint32Array|bitArray} words one block of words.
	   * @private
	   */
	  _block: function _block(words) {
	    var sha1 = this;
	    var h = sha1._h; // When words is passed to _block, it has 16 elements. SHA1 _block
	    // function extends words with new elements (at the end there are 80 elements). 
	    // The problem is that if we use Uint32Array instead of Array, 
	    // the length of Uint32Array cannot be changed. Thus, we replace words with a 
	    // normal Array here.

	    var w = Array(80); // do not use Uint32Array here as the instantiation is slower

	    for (var j = 0; j < 16; j++) {
	      w[j] = words[j];
	    }

	    var a = h[0];
	    var b = h[1];
	    var c = h[2];
	    var d = h[3];
	    var e = h[4];

	    for (var t = 0; t <= 79; t++) {
	      if (t >= 16) {
	        w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
	      }

	      var tmp = sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] + sha1._key[Math.floor(t / 20)] | 0;
	      e = d;
	      d = c;
	      c = sha1._S(30, b);
	      b = a;
	      a = tmp;
	    }

	    h[0] = h[0] + a | 0;
	    h[1] = h[1] + b | 0;
	    h[2] = h[2] + c | 0;
	    h[3] = h[3] + d | 0;
	    h[4] = h[4] + e | 0;
	  }
	};
	/** @fileOverview Low-level AES implementation.
	 *
	 * This file contains a low-level implementation of AES, optimized for
	 * size and for efficiency on several browsers.  It is based on
	 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
	 * Rijmen, Antoon Bosselaers and Paulo Barreto.
	 *
	 * An older version of this implementation is available in the public
	 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
	 * Stanford University 2008-2010 and BSD-licensed for liability
	 * reasons.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	var cipher = {};
	/**
	 * Schedule out an AES key for both encryption and decryption.  This
	 * is a low-level class.  Use a cipher mode to do bulk encryption.
	 *
	 * @constructor
	 * @param {Array} key The key as an array of 4, 6 or 8 words.
	 */

	cipher.aes = /*#__PURE__*/function () {
	  function _class(key) {
	    _classCallCheck(this, _class);

	    /**
	     * The expanded S-box and inverse S-box tables.  These will be computed
	     * on the client so that we don't have to send them down the wire.
	     *
	     * There are two tables, _tables[0] is for encryption and
	     * _tables[1] is for decryption.
	     *
	     * The first 4 sub-tables are the expanded S-box with MixColumns.  The
	     * last (_tables[01][4]) is the S-box itself.
	     *
	     * @private
	     */
	    var aes = this;
	    aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

	    if (!aes._tables[0][0][0]) {
	      aes._precompute();
	    }

	    var sbox = aes._tables[0][4];
	    var decTable = aes._tables[1];
	    var keyLen = key.length;
	    var i,
	        encKey,
	        decKey,
	        rcon = 1;

	    if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
	      throw new Error("invalid aes key size");
	    }

	    aes._key = [encKey = key.slice(0), decKey = []]; // schedule encryption keys

	    for (i = keyLen; i < 4 * keyLen + 28; i++) {
	      var tmp = encKey[i - 1]; // apply sbox

	      if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
	        tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255]; // shift rows and add rcon

	        if (i % keyLen === 0) {
	          tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
	          rcon = rcon << 1 ^ (rcon >> 7) * 283;
	        }
	      }

	      encKey[i] = encKey[i - keyLen] ^ tmp;
	    } // schedule decryption keys


	    for (var j = 0; i; j++, i--) {
	      var _tmp = encKey[j & 3 ? i : i - 4];

	      if (i <= 4 || j < 4) {
	        decKey[j] = _tmp;
	      } else {
	        decKey[j] = decTable[0][sbox[_tmp >>> 24]] ^ decTable[1][sbox[_tmp >> 16 & 255]] ^ decTable[2][sbox[_tmp >> 8 & 255]] ^ decTable[3][sbox[_tmp & 255]];
	      }
	    }
	  } // public

	  /* Something like this might appear here eventually
	  name: "AES",
	  blockSize: 4,
	  keySizes: [4,6,8],
	  */

	  /**
	   * Encrypt an array of 4 big-endian words.
	   * @param {Array} data The plaintext.
	   * @return {Array} The ciphertext.
	   */


	  _createClass(_class, [{
	    key: "encrypt",
	    value: function encrypt(data) {
	      return this._crypt(data, 0);
	    }
	    /**
	     * Decrypt an array of 4 big-endian words.
	     * @param {Array} data The ciphertext.
	     * @return {Array} The plaintext.
	     */

	  }, {
	    key: "decrypt",
	    value: function decrypt(data) {
	      return this._crypt(data, 1);
	    }
	    /**
	     * Expand the S-box tables.
	     *
	     * @private
	     */

	  }, {
	    key: "_precompute",
	    value: function _precompute() {
	      var encTable = this._tables[0];
	      var decTable = this._tables[1];
	      var sbox = encTable[4];
	      var sboxInv = decTable[4];
	      var d = [];
	      var th = [];
	      var xInv, x2, x4, x8; // Compute double and third tables

	      for (var i = 0; i < 256; i++) {
	        th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
	      }

	      for (var x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
	        // Compute sbox
	        var s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
	        s = s >> 8 ^ s & 255 ^ 99;
	        sbox[x] = s;
	        sboxInv[s] = x; // Compute MixColumns

	        x8 = d[x4 = d[x2 = d[x]]];
	        var tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
	        var tEnc = d[s] * 0x101 ^ s * 0x1010100;

	        for (var _i = 0; _i < 4; _i++) {
	          encTable[_i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
	          decTable[_i][s] = tDec = tDec << 24 ^ tDec >>> 8;
	        }
	      } // Compactify.  Considerable speedup on Firefox.


	      for (var _i2 = 0; _i2 < 5; _i2++) {
	        encTable[_i2] = encTable[_i2].slice(0);
	        decTable[_i2] = decTable[_i2].slice(0);
	      }
	    }
	    /**
	     * Encryption and decryption core.
	     * @param {Array} input Four words to be encrypted or decrypted.
	     * @param dir The direction, 0 for encrypt and 1 for decrypt.
	     * @return {Array} The four encrypted or decrypted words.
	     * @private
	     */

	  }, {
	    key: "_crypt",
	    value: function _crypt(input, dir) {
	      if (input.length !== 4) {
	        throw new Error("invalid aes block size");
	      }

	      var key = this._key[dir];
	      var nInnerRounds = key.length / 4 - 2;
	      var out = [0, 0, 0, 0];
	      var table = this._tables[dir]; // load up the tables

	      var t0 = table[0];
	      var t1 = table[1];
	      var t2 = table[2];
	      var t3 = table[3];
	      var sbox = table[4]; // state variables a,b,c,d are loaded with pre-whitened data

	      var a = input[0] ^ key[0];
	      var b = input[dir ? 3 : 1] ^ key[1];
	      var c = input[2] ^ key[2];
	      var d = input[dir ? 1 : 3] ^ key[3];
	      var kIndex = 4;
	      var a2, b2, c2; // Inner rounds.  Cribbed from OpenSSL.

	      for (var i = 0; i < nInnerRounds; i++) {
	        a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
	        b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
	        c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
	        d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
	        kIndex += 4;
	        a = a2;
	        b = b2;
	        c = c2;
	      } // Last round.


	      for (var _i3 = 0; _i3 < 4; _i3++) {
	        out[dir ? 3 & -_i3 : _i3] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
	        a2 = a;
	        a = b;
	        b = c;
	        c = d;
	        d = a2;
	      }

	      return out;
	    }
	  }]);

	  return _class;
	}();
	/** @fileOverview CTR mode implementation.
	 *
	 * Special thanks to Roy Nicholson for pointing out a bug in our
	 * implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** Brian Gladman's CTR Mode.
	* @constructor
	* @param {Object} _prf The aes instance to generate key.
	* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
	*/


	var mode = {};
	/**
	 * Brian Gladman's CTR Mode.
	 * @namespace
	 */

	mode.ctrGladman = /*#__PURE__*/function () {
	  function _class2(prf, iv) {
	    _classCallCheck(this, _class2);

	    this._prf = prf;
	    this._initIv = iv;
	    this._iv = iv;
	  }

	  _createClass(_class2, [{
	    key: "reset",
	    value: function reset() {
	      this._iv = this._initIv;
	    }
	    /** Input some data to calculate.
	     * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
	     */

	  }, {
	    key: "update",
	    value: function update(data) {
	      return this.calculate(this._prf, data, this._iv);
	    }
	  }, {
	    key: "incWord",
	    value: function incWord(word) {
	      if ((word >> 24 & 0xff) === 0xff) {
	        //overflow
	        var b1 = word >> 16 & 0xff;
	        var b2 = word >> 8 & 0xff;
	        var b3 = word & 0xff;

	        if (b1 === 0xff) {
	          // overflow b1   
	          b1 = 0;

	          if (b2 === 0xff) {
	            b2 = 0;

	            if (b3 === 0xff) {
	              b3 = 0;
	            } else {
	              ++b3;
	            }
	          } else {
	            ++b2;
	          }
	        } else {
	          ++b1;
	        }

	        word = 0;
	        word += b1 << 16;
	        word += b2 << 8;
	        word += b3;
	      } else {
	        word += 0x01 << 24;
	      }

	      return word;
	    }
	  }, {
	    key: "incCounter",
	    value: function incCounter(counter) {
	      if ((counter[0] = this.incWord(counter[0])) === 0) {
	        // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
	        counter[1] = this.incWord(counter[1]);
	      }
	    }
	  }, {
	    key: "calculate",
	    value: function calculate(prf, data, iv) {
	      var l;

	      if (!(l = data.length)) {
	        return [];
	      }

	      var bl = bitArray.bitLength(data);

	      for (var i = 0; i < l; i += 4) {
	        this.incCounter(iv);
	        var e = prf.encrypt(iv);
	        data[i] ^= e[0];
	        data[i + 1] ^= e[1];
	        data[i + 2] ^= e[2];
	        data[i + 3] ^= e[3];
	      }

	      return bitArray.clamp(data, bl);
	    }
	  }]);

	  return _class2;
	}();

	var misc = {};
	/** @fileOverview HMAC implementation.
	 *
	 * @author Emily Stark
	 * @author Mike Hamburg
	 * @author Dan Boneh
	 */

	/** HMAC with the specified hash function.
	 * @constructor
	 * @param {bitArray} key the key for HMAC.
	 * @param {Object} [Hash=hash.sha1] The hash function to use.
	 */

	misc.hmacSha1 = /*#__PURE__*/function () {
	  function _class3(key) {
	    _classCallCheck(this, _class3);

	    var hmac = this;
	    var Hash = hmac._hash = hash.sha1;
	    var exKey = [[], []];
	    var bs = Hash.prototype.blockSize / 32;
	    hmac._baseHash = [new Hash(), new Hash()];

	    if (key.length > bs) {
	      key = Hash.hash(key);
	    }

	    for (var i = 0; i < bs; i++) {
	      exKey[0][i] = key[i] ^ 0x36363636;
	      exKey[1][i] = key[i] ^ 0x5C5C5C5C;
	    }

	    hmac._baseHash[0].update(exKey[0]);

	    hmac._baseHash[1].update(exKey[1]);

	    hmac._resultHash = new Hash(hmac._baseHash[0]);
	  }

	  _createClass(_class3, [{
	    key: "reset",
	    value: function reset() {
	      var hmac = this;
	      hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
	      hmac._updated = false;
	    }
	  }, {
	    key: "update",
	    value: function update(data) {
	      var hmac = this;
	      hmac._updated = true;

	      hmac._resultHash.update(data);
	    }
	  }, {
	    key: "digest",
	    value: function digest() {
	      var hmac = this;

	      var w = hmac._resultHash.finalize();

	      var result = new hmac._hash(hmac._baseHash[1]).update(w).finalize();
	      hmac.reset();
	      return result;
	    }
	  }]);

	  return _class3;
	}();

	var createKeys$1 = _async(function (target, password, salt) {
	  var encodedPassword = encodeText(password);
	  return _await(crypto.subtle.importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE), function (basekey) {
	    return _await(crypto.subtle.deriveBits(Object.assign({
	      salt: salt
	    }, DERIVED_BITS_ALGORITHM), basekey, 8 * (KEY_LENGTH[target.strength] * 2 + 2)), function (derivedBits) {
	      var compositeKey = new Uint8Array(derivedBits);
	      target.keys = {
	        key: codecBytes.toBits(subarray(compositeKey, 0, KEY_LENGTH[target.strength])),
	        authentication: codecBytes.toBits(subarray(compositeKey, KEY_LENGTH[target.strength], KEY_LENGTH[target.strength] * 2)),
	        passwordVerification: subarray(compositeKey, KEY_LENGTH[target.strength] * 2)
	      };
	    });
	  });
	});

	var createEncryptionKeys = _async(function (encrypt, password) {
	  var salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH[encrypt.strength]));
	  return _await(createKeys$1(encrypt, password, salt), function () {
	    return concat$1(salt, encrypt.keys.passwordVerification);
	  });
	});

	var createDecryptionKeys = _async(function (decrypt, preambleArray, password) {
	  return _await(createKeys$1(decrypt, password, subarray(preambleArray, 0, SALT_LENGTH[decrypt.strength])), function () {
	    var passwordVerification = subarray(preambleArray, SALT_LENGTH[decrypt.strength]);
	    var passwordVerificationKey = decrypt.keys.passwordVerification;

	    if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
	      throw new Error(ERR_INVALID_PASSWORD);
	    }
	  });
	});

	var ERR_INVALID_PASSWORD = "Invalid pasword";
	var BLOCK_LENGTH = 16;
	var RAW_FORMAT = "raw";
	var PBKDF2_ALGORITHM = {
	  name: "PBKDF2"
	};
	var HASH_ALGORITHM = {
	  name: "HMAC"
	};
	var HASH_FUNCTION = "SHA-1";
	var BASE_KEY_ALGORITHM = Object.assign({
	  hash: HASH_ALGORITHM
	}, PBKDF2_ALGORITHM);
	var DERIVED_BITS_ALGORITHM = Object.assign({
	  iterations: 1000,
	  hash: {
	    name: HASH_FUNCTION
	  }
	}, PBKDF2_ALGORITHM);
	var DERIVED_BITS_USAGE = ["deriveBits"];
	var SALT_LENGTH = [8, 12, 16];
	var KEY_LENGTH = [16, 24, 32];
	var SIGNATURE_LENGTH = 10;
	var COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
	var codecBytes = codec.bytes;
	var Aes = cipher.aes;
	var CtrGladman = mode.ctrGladman;
	var HmacSha1 = misc.hmacSha1;

	var AESDecrypt = /*#__PURE__*/function () {
	  function AESDecrypt(password, signed, strength) {
	    _classCallCheck(this, AESDecrypt);

	    Object.assign(this, {
	      password: password,
	      signed: signed,
	      strength: strength - 1,
	      pendingInput: new Uint8Array(0)
	    });
	  }

	  _createClass(AESDecrypt, [{
	    key: "append",
	    value: function append(input) {
	      try {
	        var _this2 = this;

	        var aesCrypto = _this2;
	        return _await(_invoke(function () {
	          if (aesCrypto.password) {
	            var preamble = subarray(input, 0, SALT_LENGTH[aesCrypto.strength] + 2);
	            return _await(createDecryptionKeys(aesCrypto, preamble, aesCrypto.password), function () {
	              aesCrypto.password = null;
	              aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
	              aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
	              input = subarray(input, SALT_LENGTH[aesCrypto.strength] + 2);
	            });
	          }
	        }, function () {
	          var output = new Uint8Array(input.length - SIGNATURE_LENGTH - (input.length - SIGNATURE_LENGTH) % BLOCK_LENGTH);
	          return _append(aesCrypto, input, output, 0, SIGNATURE_LENGTH, true);
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      var aesCrypto = this;
	      var pendingInput = aesCrypto.pendingInput;
	      var chunkToDecrypt = subarray(pendingInput, 0, pendingInput.length - SIGNATURE_LENGTH);
	      var originalSignature = subarray(pendingInput, pendingInput.length - SIGNATURE_LENGTH);
	      var decryptedChunkArray = new Uint8Array(0);

	      if (chunkToDecrypt.length) {
	        var encryptedChunk = codecBytes.toBits(chunkToDecrypt);
	        aesCrypto.hmac.update(encryptedChunk);
	        var decryptedChunk = aesCrypto.aesCtrGladman.update(encryptedChunk);
	        decryptedChunkArray = codecBytes.fromBits(decryptedChunk);
	      }

	      var valid = true;

	      if (aesCrypto.signed) {
	        var signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);

	        for (var indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
	          if (signature[indexSignature] != originalSignature[indexSignature]) {
	            valid = false;
	          }
	        }
	      }

	      return {
	        valid: valid,
	        data: decryptedChunkArray
	      };
	    }
	  }]);

	  return AESDecrypt;
	}();

	var AESEncrypt = /*#__PURE__*/function () {
	  function AESEncrypt(password, strength) {
	    _classCallCheck(this, AESEncrypt);

	    Object.assign(this, {
	      password: password,
	      strength: strength - 1,
	      pendingInput: new Uint8Array(0)
	    });
	  }

	  _createClass(AESEncrypt, [{
	    key: "append",
	    value: function append(input) {
	      try {
	        var _this4 = this;

	        var aesCrypto = _this4;
	        var preamble = new Uint8Array(0);
	        return _await(_invoke(function () {
	          if (aesCrypto.password) {
	            return _await(createEncryptionKeys(aesCrypto, aesCrypto.password), function (_createEncryptionKeys) {
	              preamble = _createEncryptionKeys;
	              aesCrypto.password = null;
	              aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
	              aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
	            });
	          }
	        }, function () {
	          var output = new Uint8Array(preamble.length + input.length - input.length % BLOCK_LENGTH);
	          output.set(preamble, 0);
	          return _append(aesCrypto, input, output, preamble.length, 0);
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      var aesCrypto = this;
	      var encryptedChunkArray = new Uint8Array(0);

	      if (aesCrypto.pendingInput.length) {
	        var encryptedChunk = aesCrypto.aesCtrGladman.update(codecBytes.toBits(aesCrypto.pendingInput));
	        aesCrypto.hmac.update(encryptedChunk);
	        encryptedChunkArray = codecBytes.fromBits(encryptedChunk);
	      }

	      var signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
	      return {
	        data: concat$1(encryptedChunkArray, signature),
	        signature: signature
	      };
	    }
	  }]);

	  return AESEncrypt;
	}();

	function _append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
	  var inputLength = input.length - paddingEnd;

	  if (aesCrypto.pendingInput.length) {
	    input = concat$1(aesCrypto.pendingInput, input);
	    output = expand(output, inputLength - inputLength % BLOCK_LENGTH);
	  }

	  var offset;

	  for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
	    var inputChunk = codecBytes.toBits(subarray(input, offset, offset + BLOCK_LENGTH));

	    if (verifySignature) {
	      aesCrypto.hmac.update(inputChunk);
	    }

	    var outputChunk = aesCrypto.aesCtrGladman.update(inputChunk);

	    if (!verifySignature) {
	      aesCrypto.hmac.update(outputChunk);
	    }

	    output.set(codecBytes.fromBits(outputChunk), offset + paddingStart);
	  }

	  aesCrypto.pendingInput = subarray(input, offset);
	  return output;
	}

	function concat$1(leftArray, rightArray) {
	  var array = leftArray;

	  if (leftArray.length + rightArray.length) {
	    array = new Uint8Array(leftArray.length + rightArray.length);
	    array.set(leftArray, 0);
	    array.set(rightArray, leftArray.length);
	  }

	  return array;
	}

	function expand(inputArray, length) {
	  if (length && length > inputArray.length) {
	    var array = inputArray;
	    inputArray = new Uint8Array(length);
	    inputArray.set(array, 0);
	  }

	  return inputArray;
	}

	function subarray(array, begin, end) {
	  return array.subarray(begin, end);
	}

	var $$a = _export;
	var fails$c = fails$D;

	// eslint-disable-next-line es/no-math-imul -- required for testing
	var $imul = Math.imul;

	var FORCED = fails$c(function () {
	  return $imul(0xFFFFFFFF, 5) != -5 || $imul.length != 2;
	});

	// `Math.imul` method
	// https://tc39.es/ecma262/#sec-math.imul
	// some WebKit versions fails with big numbers, some has wrong arity
	$$a({ target: 'Math', stat: true, forced: FORCED }, {
	  imul: function imul(x, y) {
	    var UINT16 = 0xFFFF;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	var HEADER_LENGTH = 12;

	var ZipCryptoDecrypt = /*#__PURE__*/function () {
	  function ZipCryptoDecrypt(password, passwordVerification) {
	    _classCallCheck(this, ZipCryptoDecrypt);

	    var zipCrypto = this;
	    Object.assign(zipCrypto, {
	      password: password,
	      passwordVerification: passwordVerification
	    });
	    createKeys(zipCrypto, password);
	  }

	  _createClass(ZipCryptoDecrypt, [{
	    key: "append",
	    value: function append(input) {
	      var zipCrypto = this;

	      if (zipCrypto.password) {
	        var decryptedHeader = decrypt(zipCrypto, input.subarray(0, HEADER_LENGTH));
	        zipCrypto.password = null;

	        if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
	          throw new Error(ERR_INVALID_PASSWORD);
	        }

	        input = input.subarray(HEADER_LENGTH);
	      }

	      return decrypt(zipCrypto, input);
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      return {
	        valid: true,
	        data: new Uint8Array(0)
	      };
	    }
	  }]);

	  return ZipCryptoDecrypt;
	}();

	var ZipCryptoEncrypt = /*#__PURE__*/function () {
	  function ZipCryptoEncrypt(password, passwordVerification) {
	    _classCallCheck(this, ZipCryptoEncrypt);

	    var zipCrypto = this;
	    Object.assign(zipCrypto, {
	      password: password,
	      passwordVerification: passwordVerification
	    });
	    createKeys(zipCrypto, password);
	  }

	  _createClass(ZipCryptoEncrypt, [{
	    key: "append",
	    value: function append(input) {
	      var zipCrypto = this;
	      var output;
	      var offset;

	      if (zipCrypto.password) {
	        zipCrypto.password = null;
	        var header = crypto.getRandomValues(new Uint8Array(HEADER_LENGTH));
	        header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
	        output = new Uint8Array(input.length + header.length);
	        output.set(encrypt(zipCrypto, header), 0);
	        offset = HEADER_LENGTH;
	      } else {
	        output = new Uint8Array(input.length);
	        offset = 0;
	      }

	      output.set(encrypt(zipCrypto, input), offset);
	      return output;
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      return {
	        data: new Uint8Array(0)
	      };
	    }
	  }]);

	  return ZipCryptoEncrypt;
	}();

	function decrypt(target, input) {
	  var output = new Uint8Array(input.length);

	  for (var index = 0; index < input.length; index++) {
	    output[index] = getByte(target) ^ input[index];
	    updateKeys(target, output[index]);
	  }

	  return output;
	}

	function encrypt(target, input) {
	  var output = new Uint8Array(input.length);

	  for (var index = 0; index < input.length; index++) {
	    output[index] = getByte(target) ^ input[index];
	    updateKeys(target, input[index]);
	  }

	  return output;
	}

	function createKeys(target, password) {
	  target.keys = [0x12345678, 0x23456789, 0x34567890];
	  target.crcKey0 = new Crc32(target.keys[0]);
	  target.crcKey2 = new Crc32(target.keys[2]);

	  for (var index = 0; index < password.length; index++) {
	    updateKeys(target, password.charCodeAt(index));
	  }
	}

	function updateKeys(target, byte) {
	  target.crcKey0.append([byte]);
	  target.keys[0] = ~target.crcKey0.get();
	  target.keys[1] = getInt32(target.keys[1] + getInt8(target.keys[0]));
	  target.keys[1] = getInt32(Math.imul(target.keys[1], 134775813) + 1);
	  target.crcKey2.append([target.keys[1] >>> 24]);
	  target.keys[2] = ~target.crcKey2.get();
	}

	function getByte(target) {
	  var temp = target.keys[2] | 2;
	  return getInt8(Math.imul(temp, temp ^ 1) >>> 8);
	}

	function getInt8(number) {
	  return number & 0xFF;
	}

	function getInt32(number) {
	  return number & 0xFFFFFFFF;
	}

	var CODEC_DEFLATE = "deflate";
	var CODEC_INFLATE = "inflate";
	var ERR_INVALID_SIGNATURE = "Invalid signature";

	var Inflate = /*#__PURE__*/function () {
	  function Inflate(codecConstructor, _ref, _ref2) {
	    var signature = _ref.signature,
	        password = _ref.password,
	        signed = _ref.signed,
	        compressed = _ref.compressed,
	        zipCrypto = _ref.zipCrypto,
	        passwordVerification = _ref.passwordVerification,
	        encryptionStrength = _ref.encryptionStrength;
	    var chunkSize = _ref2.chunkSize;

	    _classCallCheck(this, Inflate);

	    var encrypted = Boolean(password);
	    Object.assign(this, {
	      signature: signature,
	      encrypted: encrypted,
	      signed: signed,
	      compressed: compressed,
	      inflate: compressed && new codecConstructor({
	        chunkSize: chunkSize
	      }),
	      crc32: signed && new Crc32(),
	      zipCrypto: zipCrypto,
	      decrypt: encrypted && zipCrypto ? new ZipCryptoDecrypt(password, passwordVerification) : new AESDecrypt(password, signed, encryptionStrength)
	    });
	  }

	  _createClass(Inflate, [{
	    key: "append",
	    value: function append(data) {
	      try {
	        var _this2 = this;

	        var codec = _this2;
	        return _await(_invoke(function () {
	          if (codec.encrypted && data.length) {
	            return _await(codec.decrypt.append(data), function (_codec$decrypt$append) {
	              data = _codec$decrypt$append;
	            });
	          }
	        }, function () {
	          return _invoke(function () {
	            if (codec.compressed && data.length) {
	              return _await(codec.inflate.append(data), function (_codec$inflate$append) {
	                data = _codec$inflate$append;
	              });
	            }
	          }, function () {
	            if ((!codec.encrypted || codec.zipCrypto) && codec.signed && data.length) {
	              codec.crc32.append(data);
	            }

	            return data;
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      try {
	        var _this4 = this;

	        var codec = _this4;
	        var signature;
	        var data = new Uint8Array(0);

	        if (codec.encrypted) {
	          var result = codec.decrypt.flush();

	          if (!result.valid) {
	            throw new Error(ERR_INVALID_SIGNATURE);
	          }

	          data = result.data;
	        }

	        if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
	          var dataViewSignature = new DataView(new Uint8Array(4).buffer);
	          signature = codec.crc32.get();
	          dataViewSignature.setUint32(0, signature);

	          if (codec.signature != dataViewSignature.getUint32(0, false)) {
	            throw new Error(ERR_INVALID_SIGNATURE);
	          }
	        }

	        return _await(_invoke(function () {
	          if (codec.compressed) {
	            return _await(codec.inflate.append(data), function (_codec$inflate$append2) {
	              data = _codec$inflate$append2 || new Uint8Array(0);
	              return _awaitIgnored(codec.inflate.flush());
	            });
	          }
	        }, function () {
	          return {
	            data: data,
	            signature: signature
	          };
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return Inflate;
	}();

	var Deflate = /*#__PURE__*/function () {
	  function Deflate(codecConstructor, _ref3, _ref4) {
	    var encrypted = _ref3.encrypted,
	        signed = _ref3.signed,
	        compressed = _ref3.compressed,
	        level = _ref3.level,
	        zipCrypto = _ref3.zipCrypto,
	        password = _ref3.password,
	        passwordVerification = _ref3.passwordVerification,
	        encryptionStrength = _ref3.encryptionStrength;
	    var chunkSize = _ref4.chunkSize;

	    _classCallCheck(this, Deflate);

	    Object.assign(this, {
	      encrypted: encrypted,
	      signed: signed,
	      compressed: compressed,
	      deflate: compressed && new codecConstructor({
	        level: level || 5,
	        chunkSize: chunkSize
	      }),
	      crc32: signed && new Crc32(),
	      zipCrypto: zipCrypto,
	      encrypt: encrypted && zipCrypto ? new ZipCryptoEncrypt(password, passwordVerification) : new AESEncrypt(password, encryptionStrength)
	    });
	  }

	  _createClass(Deflate, [{
	    key: "append",
	    value: function append(inputData) {
	      try {
	        var _this6 = this;

	        var codec = _this6;
	        var data = inputData;
	        return _await(_invoke(function () {
	          if (codec.compressed && inputData.length) {
	            return _await(codec.deflate.append(inputData), function (_codec$deflate$append) {
	              data = _codec$deflate$append;
	            });
	          }
	        }, function () {
	          return _invoke(function () {
	            if (codec.encrypted && data.length) {
	              return _await(codec.encrypt.append(data), function (_codec$encrypt$append) {
	                data = _codec$encrypt$append;
	              });
	            }
	          }, function () {
	            if ((!codec.encrypted || codec.zipCrypto) && codec.signed && inputData.length) {
	              codec.crc32.append(inputData);
	            }

	            return data;
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      try {
	        var _this8 = this;

	        var codec = _this8;
	        var signature;
	        var data = new Uint8Array(0);
	        return _await(_invoke(function () {
	          if (codec.compressed) {
	            return _await(codec.deflate.flush(), function (_codec$deflate$flush) {
	              data = _codec$deflate$flush || new Uint8Array(0);
	            });
	          }
	        }, function () {
	          return _invoke(function () {
	            if (codec.encrypted) {
	              return _await(codec.encrypt.append(data), function (_codec$encrypt$append2) {
	                data = _codec$encrypt$append2;
	                var result = codec.encrypt.flush();
	                signature = result.signature;
	                var newData = new Uint8Array(data.length + result.data.length);
	                newData.set(data, 0);
	                newData.set(result.data, data.length);
	                data = newData;
	              });
	            }
	          }, function () {
	            if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
	              signature = codec.crc32.get();
	            }

	            return {
	              data: data,
	              signature: signature
	            };
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return Deflate;
	}();

	function createCodec$1(codecConstructor, options, config) {
	  if (options.codecType.startsWith(CODEC_DEFLATE)) {
	    return new Deflate(codecConstructor, options, config);
	  } else if (options.codecType.startsWith(CODEC_INFLATE)) {
	    return new Inflate(codecConstructor, options, config);
	  }
	}

	var MESSAGE_INIT = "init";
	var MESSAGE_APPEND = "append";
	var MESSAGE_FLUSH = "flush";
	var MESSAGE_EVENT_TYPE = "message";
	var classicWorkersSupported = true;
	var getWorker = (function (workerData, codecConstructor, options, config, _onTaskFinished, webWorker, scripts) {
	  Object.assign(workerData, {
	    busy: true,
	    codecConstructor: codecConstructor,
	    options: Object.assign({}, options),
	    scripts: scripts,
	    terminate: function terminate() {
	      if (workerData.worker && !workerData.busy) {
	        workerData.worker.terminate();
	        workerData.interface = null;
	      }
	    },
	    onTaskFinished: function onTaskFinished() {
	      workerData.busy = false;

	      _onTaskFinished(workerData);
	    }
	  });
	  return webWorker ? createWebWorkerInterface(workerData, config) : createWorkerInterface(workerData, config);
	});

	function createWorkerInterface(workerData, config) {
	  var interfaceCodec = createCodec$1(workerData.codecConstructor, workerData.options, config);
	  return {
	    append: function append(data) {
	      try {
	        return _await(_catch(function () {
	          return _await(interfaceCodec.append(data));
	        }, function (error) {
	          workerData.onTaskFinished();
	          throw error;
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    },
	    flush: function flush() {
	      try {
	        return _await(_finallyRethrows(function () {
	          return _await(interfaceCodec.flush());
	        }, function (_wasThrown, _result) {
	          workerData.onTaskFinished();
	          return _rethrow(_wasThrown, _result);
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    },
	    abort: function abort() {
	      workerData.onTaskFinished();
	    }
	  };
	}

	function createWebWorkerInterface(workerData, config) {
	  var initAndSendMessage = _async(function (message) {
	    return _invoke(function () {
	      if (!messageTask) {
	        var options = workerData.options;
	        var scripts = workerData.scripts.slice(1);
	        return _awaitIgnored(sendMessage({
	          scripts: scripts,
	          type: MESSAGE_INIT,
	          options: options,
	          config: {
	            chunkSize: config.chunkSize
	          }
	        }));
	      }
	    }, function () {
	      return sendMessage(message);
	    });
	  });

	  var messageTask;
	  var workerOptions = {
	    type: "module"
	  };

	  if (!workerData.interface) {
	    if (!classicWorkersSupported) {
	      workerData.worker = getWorker(workerOptions, config.baseURL);
	    } else {
	      try {
	        workerData.worker = getWorker({}, config.baseURL);
	      } catch (error) {
	        classicWorkersSupported = false;
	        workerData.worker = getWorker(workerOptions, config.baseURL);
	      }
	    }

	    workerData.worker.addEventListener(MESSAGE_EVENT_TYPE, onMessage, false);
	    workerData.interface = {
	      append: function append(data) {
	        return initAndSendMessage({
	          type: MESSAGE_APPEND,
	          data: data
	        });
	      },
	      flush: function flush() {
	        return initAndSendMessage({
	          type: MESSAGE_FLUSH
	        });
	      },
	      abort: function abort() {
	        workerData.onTaskFinished();
	      }
	    };
	  }

	  return workerData.interface;

	  function getWorker(options, baseURL) {
	    var url, scriptUrl;
	    url = workerData.scripts[0];

	    if (typeof url == "function") {
	      url = url();
	    }

	    try {
	      scriptUrl = new URL(url, baseURL);
	    } catch (error) {
	      scriptUrl = url;
	    }

	    return new Worker(scriptUrl, options);
	  }

	  function sendMessage(message) {
	    var worker = workerData.worker;
	    var result = new Promise(function (resolve, reject) {
	      return messageTask = {
	        resolve: resolve,
	        reject: reject
	      };
	    });

	    try {
	      if (message.data) {
	        try {
	          message.data = message.data.buffer;
	          worker.postMessage(message, [message.data]);
	        } catch (error) {
	          worker.postMessage(message);
	        }
	      } else {
	        worker.postMessage(message);
	      }
	    } catch (error) {
	      messageTask.reject(error);
	      messageTask = null;
	      workerData.onTaskFinished();
	    }

	    return result;
	  }

	  function onMessage(event) {
	    var message = event.data;

	    if (messageTask) {
	      var reponseError = message.error;
	      var type = message.type;

	      if (reponseError) {
	        var error = new Error(reponseError.message);
	        error.stack = reponseError.stack;
	        messageTask.reject(error);
	        messageTask = null;
	        workerData.onTaskFinished();
	      } else if (type == MESSAGE_INIT || type == MESSAGE_FLUSH || type == MESSAGE_APPEND) {
	        var data = message.data;

	        if (type == MESSAGE_FLUSH) {
	          messageTask.resolve({
	            data: new Uint8Array(data),
	            signature: message.signature
	          });
	          messageTask = null;
	          workerData.onTaskFinished();
	        } else {
	          messageTask.resolve(data && new Uint8Array(data));
	        }
	      }
	    }
	  }
	}

	var pool = [];
	var pendingRequests = [];

	function createCodec(codecConstructor, options, config) {
	  var streamCopy = !options.compressed && !options.signed && !options.encrypted;
	  var webWorker = !streamCopy && (options.useWebWorkers || options.useWebWorkers === undefined && config.useWebWorkers);
	  var scripts = webWorker && config.workerScripts ? config.workerScripts[options.codecType] : [];

	  if (pool.length < config.maxWorkers) {
	    var workerData = {};
	    pool.push(workerData);
	    return getWorker(workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
	  } else {
	    var _workerData = pool.find(function (workerData) {
	      return !workerData.busy;
	    });

	    if (_workerData) {
	      clearTerminateTimeout(_workerData);
	      return getWorker(_workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
	    } else {
	      return new Promise(function (resolve) {
	        return pendingRequests.push({
	          resolve: resolve,
	          codecConstructor: codecConstructor,
	          options: options,
	          webWorker: webWorker,
	          scripts: scripts
	        });
	      });
	    }
	  }

	  function onTaskFinished(workerData) {
	    if (pendingRequests.length) {
	      var _pendingRequests$spli = pendingRequests.splice(0, 1),
	          _pendingRequests$spli2 = _slicedToArray(_pendingRequests$spli, 1),
	          _pendingRequests$spli3 = _pendingRequests$spli2[0],
	          resolve = _pendingRequests$spli3.resolve,
	          _codecConstructor = _pendingRequests$spli3.codecConstructor,
	          _options = _pendingRequests$spli3.options,
	          _webWorker = _pendingRequests$spli3.webWorker,
	          _scripts = _pendingRequests$spli3.scripts;

	      resolve(getWorker(workerData, _codecConstructor, _options, config, onTaskFinished, _webWorker, _scripts));
	    } else if (workerData.worker) {
	      clearTerminateTimeout(workerData);

	      if (Number.isFinite(config.terminateWorkerTimeout) && config.terminateWorkerTimeout >= 0) {
	        workerData.terminateTimeout = setTimeout(function () {
	          pool = pool.filter(function (data) {
	            return data != workerData;
	          });
	          workerData.terminate();
	        }, config.terminateWorkerTimeout);
	      }
	    } else {
	      pool = pool.filter(function (data) {
	        return data != workerData;
	      });
	    }
	  }
	}

	function clearTerminateTimeout(workerData) {
	  if (workerData.terminateTimeout) {
	    clearTimeout(workerData.terminateTimeout);
	    workerData.terminateTimeout = null;
	  }
	}

	function terminateWorkers() {
	  pool.forEach(function (workerData) {
	    clearTerminateTimeout(workerData);
	    workerData.terminate();
	  });
	}

	var global$8 = global$19;

	var path$1 = global$8;

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$3 = wellKnownSymbol$s;

	wellKnownSymbolWrapped.f = wellKnownSymbol$3;

	var path = path$1;
	var hasOwn$3 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$4 = objectDefineProperty.f;

	var defineWellKnownSymbol$2 = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwn$3(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$1('iterator');

	var objectGetOwnPropertyNamesExternal = {};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$2 = classofRaw$1;
	var toIndexedObject$2 = toIndexedObject$b;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$2 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$2(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$2(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$2(it));
	};

	var $$9 = _export;
	var global$7 = global$19;
	var getBuiltIn = getBuiltIn$9;
	var apply$2 = functionApply;
	var call$4 = functionCall;
	var uncurryThis$b = functionUncurryThis;
	var DESCRIPTORS$4 = descriptors;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var fails$b = fails$D;
	var hasOwn$2 = hasOwnProperty_1;
	var isArray = isArray$4;
	var isCallable$4 = isCallable$p;
	var isObject$3 = isObject$k;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var isSymbol = isSymbol$5;
	var anObject$4 = anObject$i;
	var toObject$1 = toObject$d;
	var toIndexedObject$1 = toIndexedObject$b;
	var toPropertyKey = toPropertyKey$5;
	var $toString = toString$9;
	var createPropertyDescriptor = createPropertyDescriptor$7;
	var nativeObjectCreate = objectCreate;
	var objectKeys$1 = objectKeys$4;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var arraySlice$1 = arraySlice$7;
	var redefine$2 = redefine$d.exports;
	var shared$1 = shared$5.exports;
	var sharedKey = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$6;
	var uid$1 = uid$5;
	var wellKnownSymbol$2 = wellKnownSymbol$s;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol = defineWellKnownSymbol$2;
	var setToStringTag$1 = setToStringTag$8;
	var InternalStateModule$1 = internalState;
	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$7.Symbol;
	var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$2 = global$7.TypeError;
	var QObject = global$7.QObject;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push$3 = uncurryThis$b([].push);

	var AllSymbols = shared$1('symbols');
	var ObjectPrototypeSymbols = shared$1('op-symbols');
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared$1('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$4 && fails$b(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
	  setInternalState$1(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$4) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$4(O);
	  var key = toPropertyKey(P);
	  anObject$4(Attributes);
	  if (hasOwn$2(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$2(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$2(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$4(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$4 || call$4($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$4(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwn$2(AllSymbols, P) && !hasOwn$2(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$2(this, P) || !hasOwn$2(AllSymbols, P) || hasOwn$2(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype && hasOwn$2(AllSymbols, key) && !hasOwn$2(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn$2(AllSymbols, key) && !(hasOwn$2(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn$2(AllSymbols, key) && !hasOwn$2(hiddenKeys$1, key)) push$3(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn$2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$2(ObjectPrototype, key))) {
	      push$3(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL$1) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$1(SymbolPrototype$1, this)) throw TypeError$2('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid$1(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) call$4(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$2(this, HIDDEN) && hasOwn$2(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (DESCRIPTORS$4 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype$1 = $Symbol[PROTOTYPE];

	  redefine$2(SymbolPrototype$1, 'toString', function toString() {
	    return getInternalState$1(this).tag;
	  });

	  redefine$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid$1(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable$1;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$2(name), name);
	  };

	  if (DESCRIPTORS$4) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype$1, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$1(this).description;
	      }
	    });
	    {
	      redefine$2(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
	    }
	  }
	}

	$$9({ global: true, wrap: true, forced: !NATIVE_SYMBOL$1, sham: !NATIVE_SYMBOL$1 }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys$1(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$$9({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$1 }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = $toString(key);
	    if (hasOwn$2(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
	    if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$9({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$1, sham: !DESCRIPTORS$4 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$9({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$1 }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$9({ target: 'Object', stat: true, forced: fails$b(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$1(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$1 || fails$b(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$9({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$1(arguments);
	      var $replacer = replacer;
	      if (!isObject$3(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (isCallable$4($replacer)) value = call$4($replacer, this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return apply$2($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype$1[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype$1.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine$2(SymbolPrototype$1, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return call$4(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$1($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	var $$8 = _export;
	var DESCRIPTORS$3 = descriptors;
	var global$6 = global$19;
	var uncurryThis$a = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var isCallable$3 = isCallable$p;
	var isPrototypeOf = objectIsPrototypeOf;
	var toString$4 = toString$9;
	var defineProperty$3 = objectDefineProperty.f;
	var copyConstructorProperties = copyConstructorProperties$2;

	var NativeSymbol = global$6.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

	if (DESCRIPTORS$3 && isCallable$3(NativeSymbol) && (!('description' in SymbolPrototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$4(arguments[0]);
	    var result = isPrototypeOf(SymbolPrototype, this)
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  SymbolWrapper.prototype = SymbolPrototype;
	  SymbolPrototype.constructor = SymbolWrapper;

	  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
	  var symbolToString = uncurryThis$a(SymbolPrototype.toString);
	  var symbolValueOf = uncurryThis$a(SymbolPrototype.valueOf);
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  var replace$2 = uncurryThis$a(''.replace);
	  var stringSlice$4 = uncurryThis$a(''.slice);

	  defineProperty$3(SymbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = symbolValueOf(this);
	      var string = symbolToString(symbol);
	      if (hasOwn$1(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = NATIVE_SYMBOL ? stringSlice$4(string, 7, -1) : replace$2(string, regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $$8({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var $$7 = _export;
	var iterate$2 = iterate$4;
	var createProperty = createProperty$6;

	// `Object.fromEntries` method
	// https://github.com/tc39/proposal-object-from-entries
	$$7({ target: 'Object', stat: true }, {
	  fromEntries: function fromEntries(iterable) {
	    var obj = {};
	    iterate$2(iterable, function (k, v) {
	      createProperty(obj, k, v);
	    }, { AS_ENTRIES: true });
	    return obj;
	  }
	});

	var anObject$3 = anObject$i;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$3(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$a = fails$D;
	var global$5 = global$19;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$5.RegExp;

	var UNSUPPORTED_Y$2 = fails$a(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$a(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$a(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$2
	};

	var fails$9 = fails$D;
	var global$4 = global$19;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$4.RegExp;

	var regexpUnsupportedDotAll = fails$9(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$8 = fails$D;
	var global$3 = global$19;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$3.RegExp;

	var regexpUnsupportedNcg = fails$8(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$3 = functionCall;
	var uncurryThis$9 = functionUncurryThis;
	var toString$3 = toString$9;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared = shared$5.exports;
	var create$1 = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$2 = uncurryThis$9(''.charAt);
	var indexOf = uncurryThis$9(''.indexOf);
	var replace$1 = uncurryThis$9(''.replace);
	var stringSlice$3 = uncurryThis$9(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$3(nativeExec, re1, 'a');
	  call$3(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString$3(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$3(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = call$3(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$1(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$3(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$3(match.input, charsAdded);
	        match[0] = stringSlice$3(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      call$3(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$1(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$6 = _export;
	var exec$1 = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$6({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
	  exec: exec$1
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$8 = functionUncurryThis;
	var redefine$1 = redefine$d.exports;
	var regexpExec$2 = regexpExec$3;
	var fails$7 = fails$D;
	var wellKnownSymbol$1 = wellKnownSymbol$s;
	var createNonEnumerableProperty = createNonEnumerableProperty$a;

	var SPECIES = wellKnownSymbol$1('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$1(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$7(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$7(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$8(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$8(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    redefine$1(String.prototype, KEY, methods[0]);
	    redefine$1(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var global$2 = global$19;
	var call$2 = functionCall;
	var anObject$2 = anObject$i;
	var isCallable$2 = isCallable$p;
	var classof$1 = classofRaw$1;
	var regexpExec$1 = regexpExec$3;

	var TypeError$1 = global$2.TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$2(exec)) {
	    var result = call$2(exec, R, S);
	    if (result !== null) anObject$2(result);
	    return result;
	  }
	  if (classof$1(R) === 'RegExp') return call$2(regexpExec$1, R, S);
	  throw TypeError$1('RegExp#exec called on incompatible receiver');
	};

	var apply$1 = functionApply;
	var call$1 = functionCall;
	var uncurryThis$7 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var isRegExp = isRegexp;
	var anObject$1 = anObject$i;
	var requireObjectCoercible$2 = requireObjectCoercible$8;
	var speciesConstructor = speciesConstructor$4;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var toLength$2 = toLength$a;
	var toString$2 = toString$9;
	var getMethod$1 = getMethod$5;
	var arraySlice = arraySliceSimple;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var fails$6 = fails$D;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$2 = Math.min;
	var $push = [].push;
	var exec = uncurryThis$7(/./.exec);
	var push$2 = uncurryThis$7($push);
	var stringSlice$2 = uncurryThis$7(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$6(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    // eslint-disable-next-line regexp/no-empty-group -- required for testing
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = toString$2(requireObjectCoercible$2(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) {
	        return call$1(nativeSplit, string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = call$1(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push$2(output, stringSlice$2(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) apply$1($push, output, arraySlice(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec(separatorCopy, '')) push$2(output, '');
	      } else push$2(output, stringSlice$2(string, lastLastIndex));
	      return output.length > lim ? arraySlice(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : call$1(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$2(this);
	      var splitter = separator == undefined ? undefined : getMethod$1(separator, SPLIT);
	      return splitter
	        ? call$1(splitter, separator, O, limit)
	        : call$1(internalSplit, toString$2(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$1(this);
	      var S = toString$2(string);
	      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

	      if (res.done) return res.value;

	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$2(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$2(toLength$2(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex$1(S, q, unicodeMatching);
	        } else {
	          push$2(A, stringSlice$2(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$2(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$2(A, stringSlice$2(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var fails$5 = fails$D;
	var whitespaces = whitespaces$2;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$5(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$5 = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$5({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var uncurryThis$6 = functionUncurryThis;
	var toObject = toObject$d;

	var floor = Math.floor;
	var charAt = uncurryThis$6(''.charAt);
	var replace = uncurryThis$6(''.replace);
	var stringSlice$1 = uncurryThis$6(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$1(str, 0, position);
	      case "'": return stringSlice$1(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var apply = functionApply;
	var call = functionCall;
	var uncurryThis$5 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$4 = fails$D;
	var anObject = anObject$i;
	var isCallable$1 = isCallable$p;
	var toIntegerOrInfinity = toIntegerOrInfinity$9;
	var toLength$1 = toLength$a;
	var toString$1 = toString$9;
	var requireObjectCoercible$1 = requireObjectCoercible$8;
	var advanceStringIndex = advanceStringIndex$2;
	var getMethod = getMethod$5;
	var getSubstitution = getSubstitution$1;
	var regExpExec$1 = regexpExecAbstract;
	var wellKnownSymbol = wellKnownSymbol$s;

	var REPLACE = wellKnownSymbol('replace');
	var max = Math.max;
	var min$1 = Math.min;
	var concat = uncurryThis$5([].concat);
	var push$1 = uncurryThis$5([].push);
	var stringIndexOf = uncurryThis$5(''.indexOf);
	var stringSlice = uncurryThis$5(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$1(this);
	      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
	      return replacer
	        ? call(replacer, searchValue, O, replaceValue)
	        : call(nativeReplace, toString$1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject(this);
	      var S = toString$1(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$1(replaceValue);
	      if (!functionalReplace) replaceValue = toString$1(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$1(rx, S);
	        if (result === null) break;

	        push$1(results, result);
	        if (!global) break;

	        var matchStr = toString$1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$1(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$1(result[0]);
	        var position = max(min$1(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
	          var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var internalMetadata = {exports: {}};

	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails$3 = fails$D;

	var arrayBufferNonExtensible = fails$3(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
	  }
	});

	var fails$2 = fails$D;
	var isObject$2 = isObject$k;
	var classof = classofRaw$1;
	var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES = fails$2(function () { $isExtensible(1); });

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
	  if (!isObject$2(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;

	var fails$1 = fails$D;

	var freezing = !fails$1(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var $$4 = _export;
	var uncurryThis$4 = functionUncurryThis;
	var hiddenKeys = hiddenKeys$6;
	var isObject$1 = isObject$k;
	var hasOwn = hasOwnProperty_1;
	var defineProperty$2 = objectDefineProperty.f;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
	var isExtensible = objectIsExtensible;
	var uid = uid$5;
	var FREEZING = freezing;

	var REQUIRED = false;
	var METADATA = uid('meta');
	var id = 0;

	var setMetadata = function (it) {
	  defineProperty$2(it, METADATA, { value: {
	    objectID: 'O' + id++, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey$1 = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!hasOwn(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
	  return it;
	};

	var enable = function () {
	  meta.enable = function () { /* empty */ };
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
	  var splice = uncurryThis$4([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      } return result;
	    };

	    $$4({ target: 'Object', stat: true, forced: true }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};

	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey$1,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;

	var $$3 = _export;
	var global$1 = global$19;
	var uncurryThis$3 = functionUncurryThis;
	var isForced = isForced_1;
	var redefine = redefine$d.exports;
	var InternalMetadataModule = internalMetadata.exports;
	var iterate$1 = iterate$4;
	var anInstance$1 = anInstance$7;
	var isCallable = isCallable$p;
	var isObject = isObject$k;
	var fails = fails$D;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
	var setToStringTag = setToStringTag$8;
	var inheritIfRequired = inheritIfRequired$3;

	var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var uncurriedNativeMethod = uncurryThis$3(NativePrototype[KEY]);
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        uncurriedNativeMethod(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  var REPLACE = isForced(
	    CONSTRUCTOR_NAME,
	    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	      new NativeConstructor().entries().next();
	    }))
	  );

	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.enable();
	  } else if (isForced(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$1(dummy, NativePrototype);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $$3({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var defineProperty$1 = objectDefineProperty.f;
	var create = objectCreate;
	var redefineAll = redefineAll$4;
	var bind = functionBindContext;
	var anInstance = anInstance$7;
	var iterate = iterate$4;
	var defineIterator = defineIterator$3;
	var setSpecies = setSpecies$3;
	var DESCRIPTORS$2 = descriptors;
	var fastKey = internalMetadata.exports.fastKey;
	var InternalStateModule = internalState;

	var setInternalState = InternalStateModule.set;
	var internalStateGetterFor = InternalStateModule.getterFor;

	var collectionStrong$1 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance(that, Prototype);
	      setInternalState(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!DESCRIPTORS$2) that.size = 0;
	      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (DESCRIPTORS$2) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(Prototype, {
	      // `{ Map, Set }.prototype.clear()` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.clear
	      // https://tc39.es/ecma262/#sec-set.prototype.clear
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (DESCRIPTORS$2) state.size = 0;
	        else that.size = 0;
	      },
	      // `{ Map, Set }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.delete
	      // https://tc39.es/ecma262/#sec-set.prototype.delete
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (DESCRIPTORS$2) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.foreach
	      // https://tc39.es/ecma262/#sec-set.prototype.foreach
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // `{ Map, Set}.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.has
	      // https://tc39.es/ecma262/#sec-set.prototype.has
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(Prototype, IS_MAP ? {
	      // `Map.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.get
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // `Map.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.set
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // `Set.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-set.prototype.add
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (DESCRIPTORS$2) defineProperty$1(Prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return Constructor;
	  },
	  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
	    // https://tc39.es/ecma262/#sec-map.prototype.entries
	    // https://tc39.es/ecma262/#sec-map.prototype.keys
	    // https://tc39.es/ecma262/#sec-map.prototype.values
	    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
	    // https://tc39.es/ecma262/#sec-set.prototype.entries
	    // https://tc39.es/ecma262/#sec-set.prototype.keys
	    // https://tc39.es/ecma262/#sec-set.prototype.values
	    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
	    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // `{ Map, Set }.prototype[@@species]` accessors
	    // https://tc39.es/ecma262/#sec-get-map-@@species
	    // https://tc39.es/ecma262/#sec-get-set-@@species
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	var collection = collection$1;
	var collectionStrong = collectionStrong$1;

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var DESCRIPTORS$1 = descriptors;
	var uncurryThis$2 = functionUncurryThis;
	var objectKeys = objectKeys$4;
	var toIndexedObject = toIndexedObject$b;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$2($propertyIsEnumerable);
	var push = uncurryThis$2([].push);

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$1 || propertyIsEnumerable(O, key)) {
	        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod(false)
	};

	var $$2 = _export;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$2({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var sendFetchRequest = _async(function (method, _ref2, headers) {
	  var options = _ref2.options,
	      url = _ref2.url;
	  return _await(fetch(url, Object.assign({}, options, {
	    method: method,
	    headers: headers
	  })), function (response) {
	    if (response.status < 400) {
	      return response;
	    } else {
	      throw new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
	    }
	  });
	});

	var getContentLength = _async(function (httpReader, sendRequest, getRequestData) {
	  return _invokeIgnored(function () {
	    if (httpReader.preventHeadRequest) {
	      return _awaitIgnored(getRequestData(httpReader, httpReader.options));
	    } else {
	      return _await(sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader)), function (response) {
	        var contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
	        return _invokeIgnored(function () {
	          if (contentLength) {
	            httpReader.size = Number(contentLength);
	          } else {
	            return _awaitIgnored(getRequestData(httpReader, httpReader.options));
	          }
	        });
	      });
	    }
	  });
	});

	var getRequestData = _async(function (httpReader, sendRequest) {
	  return _await(sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader)), function (response) {
	    return _await(response.arrayBuffer(), function (_response$arrayBuffer2) {
	      httpReader.data = new Uint8Array(_response$arrayBuffer2);

	      if (!httpReader.size) {
	        httpReader.size = httpReader.data.length;
	      }
	    });
	  });
	});

	var getXMLHttpRequestData = _async(function (httpReader) {
	  return _awaitIgnored(getRequestData(httpReader, sendXMLHttpRequest));
	});

	var getFetchRequestData = _async(function (httpReader) {
	  return _awaitIgnored(getRequestData(httpReader, sendFetchRequest));
	});

	var readUint8ArrayHttpReader = _async(function (httpReader, index, length, sendRequest, getRequestData) {
	  if (httpReader.useRangeHeader || httpReader.forceRangeRequests) {
	    return _await(sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length)), function (response) {
	      if (response.status != 206) {
	        throw new Error(ERR_HTTP_RANGE);
	      }

	      return _await(response.arrayBuffer(), function (_response$arrayBuffer) {
	        return new Uint8Array(_response$arrayBuffer);
	      });
	    });
	  } else {
	    return _invoke(function () {
	      if (!httpReader.data) {
	        return _awaitIgnored(getRequestData(httpReader, httpReader.options));
	      }
	    }, function () {
	      return new Uint8Array(httpReader.data.subarray(index, index + length));
	    });
	  }
	});

	var initHttpReader = _async(function (httpReader, sendRequest, getRequestData) {
	  return function () {
	    if (isHttpFamily(httpReader.url) && (httpReader.useRangeHeader || httpReader.forceRangeRequests)) {
	      return _await(sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader)), function (response) {
	        return function () {
	          if (!httpReader.forceRangeRequests && response.headers.get(HTTP_HEADER_ACCEPT_RANGES) != HTTP_RANGE_UNIT) {
	            throw new Error(ERR_HTTP_RANGE);
	          } else {
	            var contentSize;
	            var contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);

	            if (contentRangeHeader) {
	              var splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);

	              if (splitHeader.length) {
	                var headerValue = splitHeader[1];

	                if (headerValue && headerValue != "*") {
	                  contentSize = Number(headerValue);
	                }
	              }
	            }

	            return _invokeIgnored(function () {
	              if (contentSize === undefined) {
	                return _awaitIgnored(getContentLength(httpReader, sendRequest, getRequestData));
	              } else {
	                httpReader.size = contentSize;
	              }
	            });
	          }
	        }();
	      });
	    } else {
	      return _awaitIgnored(getContentLength(httpReader, sendRequest, getRequestData));
	    }
	  }();
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	/* global Blob, FileReader, atob, btoa, XMLHttpRequest, document, fetch */
	var ERR_HTTP_STATUS = "HTTP error ";
	var ERR_HTTP_RANGE = "HTTP Range not supported";
	var CONTENT_TYPE_TEXT_PLAIN = "text/plain";
	var HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
	var HTTP_HEADER_CONTENT_RANGE = "Content-Range";
	var HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
	var HTTP_HEADER_RANGE = "Range";
	var HTTP_METHOD_HEAD = "HEAD";
	var HTTP_METHOD_GET = "GET";
	var HTTP_RANGE_UNIT = "bytes";

	var Stream = /*#__PURE__*/function () {
	  function Stream() {
	    _classCallCheck(this, Stream);

	    this.size = 0;
	  }

	  _createClass(Stream, [{
	    key: "init",
	    value: function init() {
	      this.initialized = true;
	    }
	  }]);

	  return Stream;
	}();

	var Reader = /*#__PURE__*/function (_Stream) {
	  _inherits(Reader, _Stream);

	  var _super = _createSuper(Reader);

	  function Reader() {
	    _classCallCheck(this, Reader);

	    return _super.apply(this, arguments);
	  }

	  return _createClass(Reader);
	}(Stream);

	var Writer = /*#__PURE__*/function (_Stream2) {
	  _inherits(Writer, _Stream2);

	  var _super2 = _createSuper(Writer);

	  function Writer() {
	    _classCallCheck(this, Writer);

	    return _super2.apply(this, arguments);
	  }

	  _createClass(Writer, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      this.size += array.length;
	    }
	  }]);

	  return Writer;
	}(Stream);

	var TextReader = /*#__PURE__*/function (_Reader) {
	  _inherits(TextReader, _Reader);

	  var _super3 = _createSuper(TextReader);

	  function TextReader(text) {
	    var _this;

	    _classCallCheck(this, TextReader);

	    _this = _super3.call(this);
	    _this.blobReader = new BlobReader(new Blob([text], {
	      type: CONTENT_TYPE_TEXT_PLAIN
	    }));
	    return _this;
	  }

	  _createClass(TextReader, [{
	    key: "init",
	    value: function init() {
	      try {
	        var _this3 = this;

	        _get(_getPrototypeOf(TextReader.prototype), "init", _this3).call(_this3);

	        _this3.blobReader.init();

	        _this3.size = _this3.blobReader.size;
	        return _await();
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "readUint8Array",
	    value: function readUint8Array(offset, length) {
	      try {
	        var _this5 = this;

	        return _await(_this5.blobReader.readUint8Array(offset, length));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return TextReader;
	}(Reader);

	var TextWriter = /*#__PURE__*/function (_Writer) {
	  _inherits(TextWriter, _Writer);

	  var _super4 = _createSuper(TextWriter);

	  function TextWriter(encoding) {
	    var _this6;

	    _classCallCheck(this, TextWriter);

	    _this6 = _super4.call(this);
	    _this6.encoding = encoding;
	    _this6.blob = new Blob([], {
	      type: CONTENT_TYPE_TEXT_PLAIN
	    });
	    return _this6;
	  }

	  _createClass(TextWriter, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      try {
	        var _this8 = this;

	        _get(_getPrototypeOf(TextWriter.prototype), "writeUint8Array", _this8).call(_this8, array);

	        _this8.blob = new Blob([_this8.blob, array.buffer], {
	          type: CONTENT_TYPE_TEXT_PLAIN
	        });
	        return _await();
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      var _this9 = this;

	      if (this.blob.text) {
	        return this.blob.text();
	      } else {
	        var reader = new FileReader();
	        return new Promise(function (resolve, reject) {
	          reader.onload = function (event) {
	            return resolve(event.target.result);
	          };

	          reader.onerror = function () {
	            return reject(reader.error);
	          };

	          reader.readAsText(_this9.blob, _this9.encoding);
	        });
	      }
	    }
	  }]);

	  return TextWriter;
	}(Writer);

	var Data64URIReader = /*#__PURE__*/function (_Reader2) {
	  _inherits(Data64URIReader, _Reader2);

	  var _super5 = _createSuper(Data64URIReader);

	  function Data64URIReader(dataURI) {
	    var _this10;

	    _classCallCheck(this, Data64URIReader);

	    _this10 = _super5.call(this);
	    _this10.dataURI = dataURI;
	    var dataEnd = dataURI.length;

	    while (dataURI.charAt(dataEnd - 1) == "=") {
	      dataEnd--;
	    }

	    _this10.dataStart = dataURI.indexOf(",") + 1;
	    _this10.size = Math.floor((dataEnd - _this10.dataStart) * 0.75);
	    return _this10;
	  }

	  _createClass(Data64URIReader, [{
	    key: "readUint8Array",
	    value: function readUint8Array(offset, length) {
	      try {
	        var _this12 = this;

	        var dataArray = new Uint8Array(length);
	        var start = Math.floor(offset / 3) * 4;
	        var bytes = atob(_this12.dataURI.substring(start + _this12.dataStart, Math.ceil((offset + length) / 3) * 4 + _this12.dataStart));
	        var delta = offset - Math.floor(start / 4) * 3;

	        for (var indexByte = delta; indexByte < delta + length; indexByte++) {
	          dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
	        }

	        return _await(dataArray);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return Data64URIReader;
	}(Reader);

	var Data64URIWriter = /*#__PURE__*/function (_Writer2) {
	  _inherits(Data64URIWriter, _Writer2);

	  var _super6 = _createSuper(Data64URIWriter);

	  function Data64URIWriter(contentType) {
	    var _this13;

	    _classCallCheck(this, Data64URIWriter);

	    _this13 = _super6.call(this);
	    _this13.data = "data:" + (contentType || "") + ";base64,";
	    _this13.pending = [];
	    return _this13;
	  }

	  _createClass(Data64URIWriter, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      try {
	        var _this15 = this;

	        _get(_getPrototypeOf(Data64URIWriter.prototype), "writeUint8Array", _this15).call(_this15, array);

	        var indexArray = 0;
	        var dataString = _this15.pending;
	        var delta = _this15.pending.length;
	        _this15.pending = "";

	        for (indexArray = 0; indexArray < Math.floor((delta + array.length) / 3) * 3 - delta; indexArray++) {
	          dataString += String.fromCharCode(array[indexArray]);
	        }

	        for (; indexArray < array.length; indexArray++) {
	          _this15.pending += String.fromCharCode(array[indexArray]);
	        }

	        if (dataString.length > 2) {
	          _this15.data += btoa(dataString);
	        } else {
	          _this15.pending = dataString;
	        }

	        return _await();
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.data + btoa(this.pending);
	    }
	  }]);

	  return Data64URIWriter;
	}(Writer);

	var BlobReader = /*#__PURE__*/function (_Reader3) {
	  _inherits(BlobReader, _Reader3);

	  var _super7 = _createSuper(BlobReader);

	  function BlobReader(blob) {
	    var _this16;

	    _classCallCheck(this, BlobReader);

	    _this16 = _super7.call(this);
	    _this16.blob = blob;
	    _this16.size = blob.size;
	    return _this16;
	  }

	  _createClass(BlobReader, [{
	    key: "readUint8Array",
	    value: function readUint8Array(offset, length) {
	      try {
	        var _this18 = this;

	        if (_this18.blob.arrayBuffer) {
	          return _await(_this18.blob.slice(offset, offset + length).arrayBuffer(), function (_this17$blob$slice$ar) {
	            return new Uint8Array(_this17$blob$slice$ar);
	          });
	        } else {
	          var reader = new FileReader();
	          return _await(new Promise(function (resolve, reject) {
	            reader.onload = function (event) {
	              return resolve(new Uint8Array(event.target.result));
	            };

	            reader.onerror = function () {
	              return reject(reader.error);
	            };

	            reader.readAsArrayBuffer(_this18.blob.slice(offset, offset + length));
	          }));
	        }
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return BlobReader;
	}(Reader);

	var BlobWriter = /*#__PURE__*/function (_Writer3) {
	  _inherits(BlobWriter, _Writer3);

	  var _super8 = _createSuper(BlobWriter);

	  function BlobWriter(contentType) {
	    var _this19;

	    _classCallCheck(this, BlobWriter);

	    _this19 = _super8.call(this);
	    _this19.contentType = contentType;
	    _this19.arrayBuffers = [];
	    return _this19;
	  }

	  _createClass(BlobWriter, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      try {
	        var _this21 = this;

	        _get(_getPrototypeOf(BlobWriter.prototype), "writeUint8Array", _this21).call(_this21, array);

	        _this21.arrayBuffers.push(array.buffer);

	        return _await();
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      if (!this.blob) {
	        this.blob = new Blob(this.arrayBuffers, {
	          type: this.contentType
	        });
	      }

	      return this.blob;
	    }
	  }]);

	  return BlobWriter;
	}(Writer);

	var WritableStreamWriter = /*#__PURE__*/function (_Writer4) {
	  _inherits(WritableStreamWriter, _Writer4);

	  var _super9 = _createSuper(WritableStreamWriter);

	  function WritableStreamWriter(writableStream) {
	    var _this22;

	    _classCallCheck(this, WritableStreamWriter);

	    _this22 = _super9.call(this);
	    _this22.writableStream = writableStream;
	    _this22.writer = writableStream.getWriter();
	    return _this22;
	  }

	  _createClass(WritableStreamWriter, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      try {
	        var _this24 = this;

	        return _await(_this24.writer.ready, function () {
	          return _this24.writer.write(array);
	        });
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      try {
	        var _this26 = this;

	        return _await(_this26.writer.ready, function () {
	          return _await(_this26.writer.close(), function () {
	            return _this26.writableStream;
	          });
	        });
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return WritableStreamWriter;
	}(Writer);

	var FetchReader = /*#__PURE__*/function (_Reader4) {
	  _inherits(FetchReader, _Reader4);

	  var _super10 = _createSuper(FetchReader);

	  function FetchReader(url, options) {
	    var _this27;

	    _classCallCheck(this, FetchReader);

	    _this27 = _super10.call(this);
	    _this27.url = url;
	    _this27.preventHeadRequest = options.preventHeadRequest;
	    _this27.useRangeHeader = options.useRangeHeader;
	    _this27.forceRangeRequests = options.forceRangeRequests;
	    _this27.options = Object.assign({}, options);
	    delete _this27.options.preventHeadRequest;
	    delete _this27.options.useRangeHeader;
	    delete _this27.options.forceRangeRequests;
	    delete _this27.options.useXHR;
	    return _this27;
	  }

	  _createClass(FetchReader, [{
	    key: "init",
	    value: function init() {
	      try {
	        var _this29 = this;

	        _get(_getPrototypeOf(FetchReader.prototype), "init", _this29).call(_this29);

	        return _await(_awaitIgnored(initHttpReader(_this29, sendFetchRequest, getFetchRequestData)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "readUint8Array",
	    value: function readUint8Array(index, length) {
	      var _this30 = this;

	      return readUint8ArrayHttpReader(_this30, index, length, sendFetchRequest, getFetchRequestData);
	    }
	  }]);

	  return FetchReader;
	}(Reader);

	var XHRReader = /*#__PURE__*/function (_Reader5) {
	  _inherits(XHRReader, _Reader5);

	  var _super11 = _createSuper(XHRReader);

	  function XHRReader(url, options) {
	    var _this31;

	    _classCallCheck(this, XHRReader);

	    _this31 = _super11.call(this);
	    _this31.url = url;
	    _this31.preventHeadRequest = options.preventHeadRequest;
	    _this31.useRangeHeader = options.useRangeHeader;
	    _this31.forceRangeRequests = options.forceRangeRequests;
	    _this31.options = options;
	    return _this31;
	  }

	  _createClass(XHRReader, [{
	    key: "init",
	    value: function init() {
	      try {
	        var _this33 = this;

	        _get(_getPrototypeOf(XHRReader.prototype), "init", _this33).call(_this33);

	        return _await(_awaitIgnored(initHttpReader(_this33, sendXMLHttpRequest, getXMLHttpRequestData)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "readUint8Array",
	    value: function readUint8Array(index, length) {
	      var _this34 = this;

	      return readUint8ArrayHttpReader(_this34, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
	    }
	  }]);

	  return XHRReader;
	}(Reader);

	function getRangeHeaders(httpReader) {
	  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	  return Object.assign({}, getHeaders(httpReader), _defineProperty({}, HTTP_HEADER_RANGE, HTTP_RANGE_UNIT + "=" + index + "-" + (index + length - 1)));
	}

	function getHeaders(httpReader) {
	  var headers = httpReader.options.headers;

	  if (headers) {
	    if (Symbol.iterator in headers) {
	      return Object.fromEntries(headers);
	    } else {
	      return headers;
	    }
	  }
	}

	function sendXMLHttpRequest(method, _ref, headers) {
	  var url = _ref.url;
	  return new Promise(function (resolve, reject) {
	    var request = new XMLHttpRequest();
	    request.addEventListener("load", function () {
	      if (request.status < 400) {
	        var _headers = [];
	        request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(function (header) {
	          var splitHeader = header.trim().split(/\s*:\s*/);
	          splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, function (value) {
	            return value.toUpperCase();
	          });

	          _headers.push(splitHeader);
	        });
	        resolve({
	          status: request.status,
	          arrayBuffer: function arrayBuffer() {
	            return request.response;
	          },
	          headers: new Map(_headers)
	        });
	      } else {
	        reject(new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
	      }
	    }, false);
	    request.addEventListener("error", function (event) {
	      return reject(event.detail.error);
	    }, false);
	    request.open(method, url);

	    if (headers) {
	      for (var _i = 0, _Object$entries = Object.entries(headers); _i < _Object$entries.length; _i++) {
	        var entry = _Object$entries[_i];
	        request.setRequestHeader(entry[0], entry[1]);
	      }
	    }

	    request.responseType = "arraybuffer";
	    request.send();
	  });
	}

	var HttpReader = /*#__PURE__*/function (_Reader6) {
	  _inherits(HttpReader, _Reader6);

	  var _super12 = _createSuper(HttpReader);

	  function HttpReader(url) {
	    var _this35;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, HttpReader);

	    _this35 = _super12.call(this);
	    _this35.url = url;

	    if (options.useXHR) {
	      _this35.reader = new XHRReader(url, options);
	    } else {
	      _this35.reader = new FetchReader(url, options);
	    }

	    return _this35;
	  }

	  _createClass(HttpReader, [{
	    key: "size",
	    get: function get() {
	      return this.reader.size;
	    },
	    set: function set(value) {// ignored
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      try {
	        var _this37 = this;

	        _get(_getPrototypeOf(HttpReader.prototype), "init", _this37).call(_this37);

	        return _await(_awaitIgnored(_this37.reader.init()));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "readUint8Array",
	    value: function readUint8Array(index, length) {
	      try {
	        var _this39 = this;

	        return _await(_this39.reader.readUint8Array(index, length));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return HttpReader;
	}(Reader);

	var HttpRangeReader = /*#__PURE__*/function (_HttpReader) {
	  _inherits(HttpRangeReader, _HttpReader);

	  var _super13 = _createSuper(HttpRangeReader);

	  function HttpRangeReader(url) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, HttpRangeReader);

	    options.useRangeHeader = true;
	    return _super13.call(this, url, options);
	  }

	  return _createClass(HttpRangeReader);
	}(HttpReader);

	var Uint8ArrayReader = /*#__PURE__*/function (_Reader7) {
	  _inherits(Uint8ArrayReader, _Reader7);

	  var _super14 = _createSuper(Uint8ArrayReader);

	  function Uint8ArrayReader(array) {
	    var _this40;

	    _classCallCheck(this, Uint8ArrayReader);

	    _this40 = _super14.call(this);
	    _this40.array = array;
	    _this40.size = array.length;
	    return _this40;
	  }

	  _createClass(Uint8ArrayReader, [{
	    key: "readUint8Array",
	    value: function readUint8Array(index, length) {
	      try {
	        var _this42 = this;

	        return _await(_this42.array.slice(index, index + length));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return Uint8ArrayReader;
	}(Reader);

	var Uint8ArrayWriter = /*#__PURE__*/function (_Writer5) {
	  _inherits(Uint8ArrayWriter, _Writer5);

	  var _super15 = _createSuper(Uint8ArrayWriter);

	  function Uint8ArrayWriter() {
	    var _this43;

	    _classCallCheck(this, Uint8ArrayWriter);

	    _this43 = _super15.call(this);
	    _this43.array = new Uint8Array(0);
	    return _this43;
	  }

	  _createClass(Uint8ArrayWriter, [{
	    key: "writeUint8Array",
	    value: function writeUint8Array(array) {
	      try {
	        var _this45 = this;

	        _get(_getPrototypeOf(Uint8ArrayWriter.prototype), "writeUint8Array", _this45).call(_this45, array);

	        var previousArray = _this45.array;
	        _this45.array = new Uint8Array(previousArray.length + array.length);

	        _this45.array.set(previousArray);

	        _this45.array.set(array, previousArray.length);

	        return _await();
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.array;
	    }
	  }]);

	  return Uint8ArrayWriter;
	}(Writer);

	function isHttpFamily(url) {
	  if (typeof document != "undefined") {
	    var anchor = document.createElement("a");
	    anchor.href = url;
	    return anchor.protocol == "http:" || anchor.protocol == "https:";
	  } else {
	    return /^https?:\/\//i.test(url);
	  }
	}

	var $$1 = _export;
	var uncurryThis$1 = functionUncurryThis;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var toLength = toLength$a;
	var toString = toString$9;
	var notARegExp = notARegexp;
	var requireObjectCoercible = requireObjectCoercible$8;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-endswith -- safe
	var un$EndsWith = uncurryThis$1(''.endsWith);
	var slice = uncurryThis$1(''.slice);
	var min = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.endsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.endswith
	$$1({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = toString(requireObjectCoercible(this));
	    notARegExp(searchString);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = that.length;
	    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
	    var search = toString(searchString);
	    return un$EndsWith
	      ? un$EndsWith(that, search, end)
	      : slice(that, end - search.length, end) === search;
	  }
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var MAX_32_BITS = 0xffffffff;
	var MAX_16_BITS = 0xffff;
	var COMPRESSION_METHOD_DEFLATE = 0x08;
	var COMPRESSION_METHOD_STORE = 0x00;
	var COMPRESSION_METHOD_AES = 0x63;
	var LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
	var DATA_DESCRIPTOR_RECORD_SIGNATURE = 0x08074b50;
	var CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
	var END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
	var ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
	var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
	var END_OF_CENTRAL_DIR_LENGTH = 22;
	var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
	var ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
	var ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;
	var ZIP64_TOTAL_NUMBER_OF_DISKS = 1;
	var EXTRAFIELD_TYPE_ZIP64 = 0x0001;
	var EXTRAFIELD_TYPE_AES = 0x9901;
	var EXTRAFIELD_TYPE_NTFS = 0x000a;
	var EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
	var EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
	var EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
	var EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;
	var BITFLAG_ENCRYPTED = 0x01;
	var BITFLAG_LEVEL = 0x06;
	var BITFLAG_DATA_DESCRIPTOR = 0x0008;
	var BITFLAG_LANG_ENCODING_FLAG = 0x0800;
	var FILE_ATTR_MSDOS_DIR_MASK = 0x10;
	var VERSION_DEFLATE = 0x14;
	var VERSION_ZIP64 = 0x2D;
	var VERSION_AES = 0x33;
	var DIRECTORY_SIGNATURE = "/";
	var MAX_DATE = new Date(2107, 11, 31);
	var MIN_DATE = new Date(1980, 0, 1);

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
	var decodeCP437 = (function (stringValue) {
	  var result = "";

	  for (var indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
	    result += CP437[stringValue[indexCharacter]];
	  }

	  return result;
	});

	var decodeText = _async(function (value, encoding) {
	  if (encoding && encoding.trim().toLowerCase() == "cp437") {
	    return decodeCP437(value);
	  } else if (typeof TextDecoder == "undefined") {
	    var fileReader = new FileReader();
	    return new Promise(function (resolve, reject) {
	      fileReader.onload = function (event) {
	        return resolve(event.target.result);
	      };

	      fileReader.onerror = function () {
	        return reject(fileReader.error);
	      };

	      fileReader.readAsText(new Blob([value]));
	    });
	  } else {
	    return new TextDecoder(encoding).decode(value);
	  }
	});

	var writeData = _async(function (writer, data) {
	  return _invoke(function () {
	    if (data.length) {
	      return _awaitIgnored(writer.writeUint8Array(data));
	    }
	  }, function () {
	    return data.length;
	  });
	});

	var processData = _async(function (codec, reader, writer, offset, inputLength, config, options) {
	  var processChunk = _async(function () {
	    var chunkOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var outputLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var signal = options.signal;

	    if (chunkOffset < inputLength) {
	      testAborted(signal, codec);
	      return _await(reader.readUint8Array(chunkOffset + offset, Math.min(chunkSize, inputLength - chunkOffset)), function (inputData) {
	        var chunkLength = inputData.length;
	        testAborted(signal, codec);
	        return _await(codec.append(inputData), function (data) {
	          testAborted(signal, codec);
	          return _await(writeData(writer, data), function (_writeData) {
	            outputLength += _writeData;

	            if (options.onprogress) {
	              try {
	                options.onprogress(chunkOffset + chunkLength, inputLength);
	              } catch (error) {// ignored
	              }
	            }

	            return processChunk(chunkOffset + chunkSize, outputLength);
	          });
	        });
	      });
	    } else {
	      return _await(codec.flush(), function (result) {
	        return _await(writeData(writer, result.data), function (_writeData2) {
	          outputLength += _writeData2;
	          return {
	            signature: result.signature,
	            length: outputLength
	          };
	        });
	      });
	    }
	  });

	  var chunkSize = Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
	  return processChunk();
	});

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var MINIMUM_CHUNK_SIZE = 64;
	var ERR_ABORT = "Abort error";

	function testAborted(signal, codec) {
	  if (signal && signal.aborted) {
	    codec.abort();
	    throw new Error(ERR_ABORT);
	  }
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var PROPERTY_NAMES = ["filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize", "lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField", "rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod", "extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp", "version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

	var Entry = /*#__PURE__*/_createClass(function Entry(data) {
	  var _this = this;

	  _classCallCheck(this, Entry);

	  PROPERTY_NAMES.forEach(function (name) {
	    return _this[name] = data[name];
	  });
	});

	var seekSignature = _async(function (reader, signature, startOffset, minimumBytes, maximumLength) {
	  var seek = _async(function (length) {
	    var offset = startOffset - length;
	    return _await(readUint8Array(reader, offset, length), function (bytes) {
	      for (var indexByte = bytes.length - minimumBytes; indexByte >= 0; indexByte--) {
	        if (bytes[indexByte] == signatureArray[0] && bytes[indexByte + 1] == signatureArray[1] && bytes[indexByte + 2] == signatureArray[2] && bytes[indexByte + 3] == signatureArray[3]) {
	          return {
	            offset: offset + indexByte,
	            buffer: bytes.slice(indexByte, indexByte + minimumBytes).buffer
	          };
	        }
	      }
	    });
	  });

	  var signatureArray = new Uint8Array(4);
	  var signatureView = getDataView$1(signatureArray);
	  setUint32$1(signatureView, 0, signature);
	  var maximumBytes = minimumBytes + maximumLength;
	  return _await(seek(minimumBytes), function (_seek) {
	    return _await(_seek || seek(Math.min(maximumBytes, startOffset)), void 0, _seek);
	  });
	});

	var readExtraFieldUnicode = _async(function (extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
	  var extraFieldView = getDataView$1(extraFieldUnicode.data);
	  extraFieldUnicode.version = getUint8(extraFieldView, 0);
	  extraFieldUnicode.signature = getUint32(extraFieldView, 1);
	  var crc32 = new Crc32();
	  crc32.append(fileEntry[rawPropertyName]);
	  var dataViewSignature = getDataView$1(new Uint8Array(4));
	  dataViewSignature.setUint32(0, crc32.get(), true);
	  return _await(decodeText(extraFieldUnicode.data.subarray(5)), function (_decodeText) {
	    extraFieldUnicode[propertyName] = _decodeText;
	    extraFieldUnicode.valid = !fileEntry.bitFlag.languageEncodingFlag && extraFieldUnicode.signature == getUint32(dataViewSignature, 0);

	    if (extraFieldUnicode.valid) {
	      directory[propertyName] = extraFieldUnicode[propertyName];
	      directory[propertyName + "UTF8"] = true;
	    }
	  });
	});

	var readCommonFooter = _async(function (fileEntry, directory, dataView, offset) {
	  var rawExtraField = directory.rawExtraField;
	  var extraField = directory.extraField = new Map();
	  var rawExtraFieldView = getDataView$1(new Uint8Array(rawExtraField));
	  var offsetExtraField = 0;

	  try {
	    while (offsetExtraField < rawExtraField.length) {
	      var type = getUint16(rawExtraFieldView, offsetExtraField);
	      var size = getUint16(rawExtraFieldView, offsetExtraField + 2);
	      extraField.set(type, {
	        type: type,
	        data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
	      });
	      offsetExtraField += 4 + size;
	    }
	  } catch (error) {// ignored
	  }

	  var compressionMethod = getUint16(dataView, offset + 4);
	  directory.signature = getUint32(dataView, offset + 10);
	  directory.uncompressedSize = getUint32(dataView, offset + 18);
	  directory.compressedSize = getUint32(dataView, offset + 14);
	  var extraFieldZip64 = extraField.get(EXTRAFIELD_TYPE_ZIP64);

	  if (extraFieldZip64) {
	    readExtraFieldZip64(extraFieldZip64, directory);
	    directory.extraFieldZip64 = extraFieldZip64;
	  }

	  var extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
	  return _invoke(function () {
	    if (extraFieldUnicodePath) {
	      return _await(readExtraFieldUnicode(extraFieldUnicodePath, "filename", "rawFilename", directory, fileEntry), function () {
	        directory.extraFieldUnicodePath = extraFieldUnicodePath;
	      });
	    }
	  }, function () {
	    var extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
	    return _invoke(function () {
	      if (extraFieldUnicodeComment) {
	        return _await(readExtraFieldUnicode(extraFieldUnicodeComment, "comment", "rawComment", directory, fileEntry), function () {
	          directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
	        });
	      }
	    }, function () {
	      var extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);

	      if (extraFieldAES) {
	        readExtraFieldAES(extraFieldAES, directory, compressionMethod);
	        directory.extraFieldAES = extraFieldAES;
	      } else {
	        directory.compressionMethod = compressionMethod;
	      }

	      var extraFieldNTFS = extraField.get(EXTRAFIELD_TYPE_NTFS);

	      if (extraFieldNTFS) {
	        readExtraFieldNTFS(extraFieldNTFS, directory);
	        directory.extraFieldNTFS = extraFieldNTFS;
	      }

	      var extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);

	      if (extraFieldExtendedTimestamp) {
	        readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory);
	        directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
	      }
	    });
	  });
	});

	var ERR_BAD_FORMAT = "File format is not recognized";
	var ERR_EOCDR_NOT_FOUND = "End of central directory not found";
	var ERR_EOCDR_ZIP64_NOT_FOUND = "End of Zip64 central directory not found";
	var ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
	var ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
	var ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
	var ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
	var ERR_ENCRYPTED = "File contains encrypted entry";
	var ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
	var ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
	var CHARSET_UTF8 = "utf-8";
	var CHARSET_CP437 = "cp437";
	var ZIP64_PROPERTIES = ["uncompressedSize", "compressedSize", "offset"];

	var ZipReader = /*#__PURE__*/function () {
	  function ZipReader(reader) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, ZipReader);

	    Object.assign(this, {
	      reader: reader,
	      options: options,
	      config: getConfiguration()
	    });
	  }

	  _createClass(ZipReader, [{
	    key: "getEntries",
	    value: function getEntries() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      try {
	        var _this2 = this;

	        var zipReader = _this2;
	        var reader = zipReader.reader;
	        return _await(_invoke(function () {
	          if (!reader.initialized) {
	            return _awaitIgnored(reader.init());
	          }
	        }, function () {
	          if (reader.size < END_OF_CENTRAL_DIR_LENGTH) {
	            throw new Error(ERR_BAD_FORMAT);
	          }

	          return _await(seekSignature(reader, END_OF_CENTRAL_DIR_SIGNATURE, reader.size, END_OF_CENTRAL_DIR_LENGTH, MAX_16_BITS * 16), function (endOfDirectoryInfo) {
	            var _exit = false;

	            if (!endOfDirectoryInfo) {
	              throw new Error(ERR_EOCDR_NOT_FOUND);
	            }

	            var endOfDirectoryView = getDataView$1(endOfDirectoryInfo);
	            var directoryDataLength = getUint32(endOfDirectoryView, 12);
	            var directoryDataOffset = getUint32(endOfDirectoryView, 16);
	            var filesLength = getUint16(endOfDirectoryView, 8);
	            var prependedDataLength = 0;
	            return _invoke(function () {
	              if (directoryDataOffset == MAX_32_BITS || directoryDataLength == MAX_32_BITS || filesLength == MAX_16_BITS) {
	                return _await(readUint8Array(reader, endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH), function (endOfDirectoryLocatorArray) {
	                  var endOfDirectoryLocatorView = getDataView$1(endOfDirectoryLocatorArray);

	                  if (getUint32(endOfDirectoryLocatorView, 0) != ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE) {
	                    throw new Error(ERR_EOCDR_ZIP64_NOT_FOUND);
	                  }

	                  directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
	                  return _await(readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH), function (endOfDirectoryArray) {
	                    var endOfDirectoryView = getDataView$1(endOfDirectoryArray);
	                    var expectedDirectoryDataOffset = endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - ZIP64_END_OF_CENTRAL_DIR_LENGTH;
	                    return _invoke(function () {
	                      if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
	                        var originalDirectoryDataOffset = directoryDataOffset;
	                        directoryDataOffset = expectedDirectoryDataOffset;
	                        prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
	                        return _await(readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH), function (_readUint8Array) {
	                          endOfDirectoryArray = _readUint8Array;
	                          endOfDirectoryView = getDataView$1(endOfDirectoryArray);
	                        });
	                      }
	                    }, function () {
	                      if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE) {
	                        throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
	                      }

	                      filesLength = getBigUint64(endOfDirectoryView, 32);
	                      directoryDataLength = getBigUint64(endOfDirectoryView, 40);
	                      directoryDataOffset -= directoryDataLength;
	                    });
	                  });
	                });
	              }
	            }, function (_result) {
	              if (_exit) ;

	              if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
	                throw new Error(ERR_BAD_FORMAT);
	              }

	              var offset = 0;
	              return _await(readUint8Array(reader, directoryDataOffset, directoryDataLength), function (directoryArray) {
	                var directoryView = getDataView$1(directoryArray);
	                return _invoke(function () {
	                  if (directoryDataLength) {
	                    var expectedDirectoryDataOffset = endOfDirectoryInfo.offset - directoryDataLength;
	                    return _invokeIgnored(function () {
	                      if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
	                        var originalDirectoryDataOffset = directoryDataOffset;
	                        directoryDataOffset = expectedDirectoryDataOffset;
	                        prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
	                        return _await(readUint8Array(reader, directoryDataOffset, directoryDataLength), function (_readUint8Array2) {
	                          directoryArray = _readUint8Array2;
	                          directoryView = getDataView$1(directoryArray);
	                        });
	                      }
	                    });
	                  }
	                }, function () {
	                  var _exit2 = false;

	                  if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
	                    throw new Error(ERR_BAD_FORMAT);
	                  }

	                  var entries = [];
	                  var indexFile = 0;
	                  return _continue(_for(function () {
	                    return !_exit2 && indexFile < filesLength;
	                  }, function () {
	                    return indexFile++;
	                  }, function () {
	                    var fileEntry = new ZipEntry$1(reader, zipReader.config, zipReader.options);

	                    if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE) {
	                      throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
	                    }

	                    readCommonHeader(fileEntry, directoryView, offset + 6);
	                    var languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
	                    var filenameOffset = offset + 46;
	                    var extraFieldOffset = filenameOffset + fileEntry.filenameLength;
	                    var commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
	                    var versionMadeBy = getUint16(directoryView, offset + 4);
	                    var msDosCompatible = (versionMadeBy & 0) == 0;
	                    Object.assign(fileEntry, {
	                      versionMadeBy: versionMadeBy,
	                      msDosCompatible: msDosCompatible,
	                      compressedSize: 0,
	                      uncompressedSize: 0,
	                      commentLength: getUint16(directoryView, offset + 32),
	                      directory: msDosCompatible && (getUint8(directoryView, offset + 38) & FILE_ATTR_MSDOS_DIR_MASK) == FILE_ATTR_MSDOS_DIR_MASK,
	                      offset: getUint32(directoryView, offset + 42) + prependedDataLength,
	                      internalFileAttribute: getUint32(directoryView, offset + 34),
	                      externalFileAttribute: getUint32(directoryView, offset + 38),
	                      rawFilename: directoryArray.subarray(filenameOffset, extraFieldOffset),
	                      filenameUTF8: languageEncodingFlag,
	                      commentUTF8: languageEncodingFlag,
	                      rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset)
	                    });
	                    var endOffset = commentOffset + fileEntry.commentLength;
	                    fileEntry.rawComment = directoryArray.subarray(commentOffset, endOffset);
	                    var filenameEncoding = getOptionValue$1(zipReader, options, "filenameEncoding");
	                    var commentEncoding = getOptionValue$1(zipReader, options, "commentEncoding");
	                    return _await(Promise.all([decodeText(fileEntry.rawFilename, fileEntry.filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437), decodeText(fileEntry.rawComment, fileEntry.commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437)]), function (_ref) {
	                      var _ref2 = _slicedToArray(_ref, 2),
	                          filename = _ref2[0],
	                          comment = _ref2[1];

	                      fileEntry.filename = filename;
	                      fileEntry.comment = comment;

	                      if (!fileEntry.directory && fileEntry.filename.endsWith(DIRECTORY_SIGNATURE)) {
	                        fileEntry.directory = true;
	                      }

	                      return _await(readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6), function () {
	                        var entry = new Entry(fileEntry);

	                        entry.getData = function (writer, options) {
	                          return fileEntry.getData(writer, entry, options);
	                        };

	                        entries.push(entry);
	                        offset = endOffset;

	                        if (options.onprogress) {
	                          try {
	                            options.onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
	                          } catch (error) {// ignored
	                          }
	                        }
	                      });
	                    });
	                  }), function (_result2) {
	                    return _exit2 ? _result2 : entries;
	                  });
	                });
	              });
	            });
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      return _await();
	    }
	  }]);

	  return ZipReader;
	}();

	var ZipEntry$1 = /*#__PURE__*/function () {
	  function ZipEntry(reader, config, options) {
	    _classCallCheck(this, ZipEntry);

	    Object.assign(this, {
	      reader: reader,
	      config: config,
	      options: options
	    });
	  }

	  _createClass(ZipEntry, [{
	    key: "getData",
	    value: function getData(writer, fileEntry) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      try {
	        var _this4 = this;

	        var zipEntry = _this4;
	        var reader = zipEntry.reader,
	            offset = zipEntry.offset,
	            extraFieldAES = zipEntry.extraFieldAES,
	            compressionMethod = zipEntry.compressionMethod,
	            config = zipEntry.config,
	            bitFlag = zipEntry.bitFlag,
	            signature = zipEntry.signature,
	            rawLastModDate = zipEntry.rawLastModDate,
	            compressedSize = zipEntry.compressedSize;
	        var localDirectory = zipEntry.localDirectory = {};
	        return _await(_invoke(function () {
	          if (!reader.initialized) {
	            return _awaitIgnored(reader.init());
	          }
	        }, function () {
	          return _await(readUint8Array(reader, offset, 30), function (dataArray) {
	            var dataView = getDataView$1(dataArray);
	            var password = getOptionValue$1(zipEntry, options, "password");
	            password = password && password.length && password;

	            if (extraFieldAES) {
	              if (extraFieldAES.originalCompressionMethod != COMPRESSION_METHOD_AES) {
	                throw new Error(ERR_UNSUPPORTED_COMPRESSION);
	              }
	            }

	            if (compressionMethod != COMPRESSION_METHOD_STORE && compressionMethod != COMPRESSION_METHOD_DEFLATE) {
	              throw new Error(ERR_UNSUPPORTED_COMPRESSION);
	            }

	            if (getUint32(dataView, 0) != LOCAL_FILE_HEADER_SIGNATURE) {
	              throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
	            }

	            readCommonHeader(localDirectory, dataView, 4);
	            return _await(readUint8Array(reader, offset, 30 + localDirectory.filenameLength + localDirectory.extraFieldLength), function (_readUint8Array3) {
	              dataArray = _readUint8Array3;
	              localDirectory.rawExtraField = dataArray.subarray(30 + localDirectory.filenameLength);
	              return _await(readCommonFooter(zipEntry, localDirectory, dataView, 4), function () {
	                fileEntry.lastAccessDate = localDirectory.lastAccessDate;
	                fileEntry.creationDate = localDirectory.creationDate;
	                var encrypted = zipEntry.encrypted && localDirectory.encrypted;
	                var zipCrypto = encrypted && !extraFieldAES;

	                if (encrypted) {
	                  if (!zipCrypto && extraFieldAES.strength === undefined) {
	                    throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
	                  } else if (!password) {
	                    throw new Error(ERR_ENCRYPTED);
	                  }
	                }

	                return _await(createCodec(config.Inflate, {
	                  codecType: CODEC_INFLATE,
	                  password: password,
	                  zipCrypto: zipCrypto,
	                  encryptionStrength: extraFieldAES && extraFieldAES.strength,
	                  signed: getOptionValue$1(zipEntry, options, "checkSignature"),
	                  passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? rawLastModDate >>> 8 & 0xFF : signature >>> 24 & 0xFF),
	                  signature: signature,
	                  compressed: compressionMethod != 0,
	                  encrypted: encrypted,
	                  useWebWorkers: getOptionValue$1(zipEntry, options, "useWebWorkers")
	                }, config), function (codec) {
	                  return _invoke(function () {
	                    if (!writer.initialized) {
	                      return _awaitIgnored(writer.init());
	                    }
	                  }, function () {
	                    var signal = getOptionValue$1(zipEntry, options, "signal");
	                    var dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
	                    return _await(processData(codec, reader, writer, dataOffset, compressedSize, config, {
	                      onprogress: options.onprogress,
	                      signal: signal
	                    }), function () {
	                      return writer.getData();
	                    });
	                  });
	                });
	              });
	            });
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return ZipEntry;
	}();

	function readCommonHeader(directory, dataView, offset) {
	  var rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
	  var encrypted = (rawBitFlag & BITFLAG_ENCRYPTED) == BITFLAG_ENCRYPTED;
	  var rawLastModDate = getUint32(dataView, offset + 6);
	  Object.assign(directory, {
	    encrypted: encrypted,
	    version: getUint16(dataView, offset),
	    bitFlag: {
	      level: (rawBitFlag & BITFLAG_LEVEL) >> 1,
	      dataDescriptor: (rawBitFlag & BITFLAG_DATA_DESCRIPTOR) == BITFLAG_DATA_DESCRIPTOR,
	      languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
	    },
	    rawLastModDate: rawLastModDate,
	    lastModDate: getDate(rawLastModDate),
	    filenameLength: getUint16(dataView, offset + 22),
	    extraFieldLength: getUint16(dataView, offset + 24)
	  });
	}

	function readExtraFieldZip64(extraFieldZip64, directory) {
	  directory.zip64 = true;
	  var extraFieldView = getDataView$1(extraFieldZip64.data);
	  extraFieldZip64.values = [];

	  for (var indexValue = 0; indexValue < Math.floor(extraFieldZip64.data.length / 8); indexValue++) {
	    extraFieldZip64.values.push(getBigUint64(extraFieldView, 0 + indexValue * 8));
	  }

	  var missingProperties = ZIP64_PROPERTIES.filter(function (propertyName) {
	    return directory[propertyName] == MAX_32_BITS;
	  });

	  for (var indexMissingProperty = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
	    extraFieldZip64[missingProperties[indexMissingProperty]] = extraFieldZip64.values[indexMissingProperty];
	  }

	  ZIP64_PROPERTIES.forEach(function (propertyName) {
	    if (directory[propertyName] == MAX_32_BITS) {
	      if (extraFieldZip64[propertyName] !== undefined) {
	        directory[propertyName] = extraFieldZip64[propertyName];
	      } else {
	        throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
	      }
	    }
	  });
	}

	function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
	  var extraFieldView = getDataView$1(extraFieldAES.data);
	  extraFieldAES.vendorVersion = getUint8(extraFieldView, 0);
	  extraFieldAES.vendorId = getUint8(extraFieldView, 2);
	  var strength = getUint8(extraFieldView, 4);
	  extraFieldAES.strength = strength;
	  extraFieldAES.originalCompressionMethod = compressionMethod;
	  directory.compressionMethod = extraFieldAES.compressionMethod = getUint16(extraFieldView, 5);
	}

	function readExtraFieldNTFS(extraFieldNTFS, directory) {
	  var extraFieldView = getDataView$1(extraFieldNTFS.data);
	  var offsetExtraField = 4;
	  var tag1Data;

	  try {
	    while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
	      var tagValue = getUint16(extraFieldView, offsetExtraField);
	      var attributeSize = getUint16(extraFieldView, offsetExtraField + 2);

	      if (tagValue == EXTRAFIELD_TYPE_NTFS_TAG1) {
	        tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
	      }

	      offsetExtraField += 4 + attributeSize;
	    }
	  } catch (error) {// ignored
	  }

	  try {
	    if (tag1Data && tag1Data.length == 24) {
	      var tag1View = getDataView$1(tag1Data);
	      var rawLastModDate = tag1View.getBigUint64(0, true);
	      var rawLastAccessDate = tag1View.getBigUint64(8, true);
	      var rawCreationDate = tag1View.getBigUint64(16, true);
	      Object.assign(extraFieldNTFS, {
	        rawLastModDate: rawLastModDate,
	        rawLastAccessDate: rawLastAccessDate,
	        rawCreationDate: rawCreationDate
	      });
	      var lastModDate = getDateNTFS(rawLastModDate);
	      var lastAccessDate = getDateNTFS(rawLastAccessDate);
	      var creationDate = getDateNTFS(rawCreationDate);
	      var extraFieldData = {
	        lastModDate: lastModDate,
	        lastAccessDate: lastAccessDate,
	        creationDate: creationDate
	      };
	      Object.assign(extraFieldNTFS, extraFieldData);
	      Object.assign(directory, extraFieldData);
	    }
	  } catch (error) {// ignored
	  }
	}

	function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory) {
	  var extraFieldView = getDataView$1(extraFieldExtendedTimestamp.data);
	  var flags = getUint8(extraFieldView, 0);
	  var timeProperties = [];
	  var timeRawProperties = [];

	  if ((flags & 0x1) == 0x1) {
	    timeProperties.push("lastModDate");
	    timeRawProperties.push("rawLastModDate");
	  }

	  if ((flags & 0x2) == 0x2) {
	    timeProperties.push("lastAccessDate");
	    timeRawProperties.push("rawLastAccessDate");
	  }

	  if ((flags & 0x4) == 0x4) {
	    timeProperties.push("creationDate");
	    timeRawProperties.push("rawCreationDate");
	  }

	  var offset = 1;
	  timeProperties.forEach(function (propertyName, indexProperty) {
	    if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
	      var time = getUint32(extraFieldView, offset);
	      directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date(time * 1000);
	      var rawPropertyName = timeRawProperties[indexProperty];
	      extraFieldExtendedTimestamp[rawPropertyName] = time;
	    }

	    offset += 4;
	  });
	}

	function getOptionValue$1(zipReader, options, name) {
	  return options[name] === undefined ? zipReader.options[name] : options[name];
	}

	function getDate(timeRaw) {
	  var date = (timeRaw & 0xffff0000) >> 16,
	      time = timeRaw & 0x0000ffff;

	  try {
	    return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
	  } catch (error) {// ignored
	  }
	}

	function getDateNTFS(timeRaw) {
	  return new Date(Number(timeRaw / BigInt(10000) - BigInt(11644473600000)));
	}

	function getUint8(view, offset) {
	  return view.getUint8(offset);
	}

	function getUint16(view, offset) {
	  return view.getUint16(offset, true);
	}

	function getUint32(view, offset) {
	  return view.getUint32(offset, true);
	}

	function getBigUint64(view, offset) {
	  return Number(view.getBigUint64(offset, true));
	}

	function setUint32$1(view, offset, value) {
	  view.setUint32(offset, value, true);
	}

	function getDataView$1(array) {
	  return new DataView(array.buffer);
	}

	function readUint8Array(reader, offset, size) {
	  return reader.readUint8Array(offset, size);
	}

	var DESCRIPTORS = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis = functionUncurryThis;
	var defineProperty = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec = uncurryThis(nameRE.exec);
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
	  defineProperty(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var createTypedArrayConstructor = typedArrayConstructor.exports;

	// `Uint16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var writeBlob = _async(function (writer, blob) {
	  var writeSlice = _async(function () {
	    return _invokeIgnored(function () {
	      if (start < blob.size) {
	        return _await(sliceAsArrayBuffer(blob, start, start + blockSize), function (arrayBuffer) {
	          return _await(writer.writeUint8Array(new Uint8Array(arrayBuffer)), function () {
	            start += blockSize;
	            return _callIgnored(writeSlice);
	          });
	        });
	      }
	    });
	  });

	  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	  var blockSize = 512 * 1024 * 1024;
	  return _callIgnored(writeSlice);
	});

	var closeFile = _async(function (zipWriter, comment, options) {
	  var writer = zipWriter.writer;
	  var files = zipWriter.files;
	  var offset = 0;
	  var directoryDataLength = 0;
	  var directoryOffset = zipWriter.offset;
	  var filesLength = files.size;

	  var _iterator = _createForOfIteratorHelper(files),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var _step$value = _slicedToArray(_step.value, 2),
	          fileEntry = _step$value[1];

	      directoryDataLength += 46 + fileEntry.rawFilename.length + fileEntry.rawComment.length + fileEntry.rawExtraFieldZip64.length + fileEntry.rawExtraFieldAES.length + fileEntry.rawExtraFieldExtendedTimestamp.length + fileEntry.rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  var zip64 = options.zip64 || zipWriter.options.zip64 || false;

	  if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS) {
	    if (options.zip64 === false || zipWriter.options.zip64 === false) {
	      throw new Error(ERR_UNSUPPORTED_FORMAT);
	    } else {
	      zip64 = true;
	    }
	  }

	  var directoryArray = new Uint8Array(directoryDataLength + (zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH));
	  var directoryView = getDataView(directoryArray);

	  if (comment && comment.length) {
	    if (comment.length <= MAX_16_BITS) {
	      setUint16(directoryView, offset + 20, comment.length);
	    } else {
	      throw new Error(ERR_INVALID_COMMENT);
	    }
	  }

	  var _iterator2 = _createForOfIteratorHelper(Array.from(files.values()).entries()),
	      _step2;

	  try {
	    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	      var _step2$value = _slicedToArray(_step2.value, 2),
	          indexFileEntry = _step2$value[0],
	          _fileEntry = _step2$value[1];

	      var rawFilename = _fileEntry.rawFilename,
	          rawExtraFieldZip64 = _fileEntry.rawExtraFieldZip64,
	          rawExtraFieldAES = _fileEntry.rawExtraFieldAES,
	          rawExtraField = _fileEntry.rawExtraField,
	          rawComment = _fileEntry.rawComment,
	          versionMadeBy = _fileEntry.versionMadeBy,
	          headerArray = _fileEntry.headerArray,
	          directory = _fileEntry.directory,
	          _zip = _fileEntry.zip64,
	          msDosCompatible = _fileEntry.msDosCompatible,
	          internalFileAttribute = _fileEntry.internalFileAttribute,
	          externalFileAttribute = _fileEntry.externalFileAttribute;
	      var rawExtraFieldExtendedTimestamp = void 0;
	      var rawExtraFieldNTFS = void 0;

	      if (_fileEntry.extendedTimestamp) {
	        rawExtraFieldNTFS = _fileEntry.rawExtraFieldNTFS;
	        rawExtraFieldExtendedTimestamp = new Uint8Array(9);
	        var extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
	        setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
	        setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
	        setUint8(extraFieldExtendedTimestampView, 4, 0x1);
	        setUint32(extraFieldExtendedTimestampView, 5, Math.floor(_fileEntry.lastModDate.getTime() / 1000));
	      } else {
	        rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
	      }

	      var extraFieldLength = rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + rawExtraField.length;
	      setUint32(directoryView, offset, CENTRAL_FILE_HEADER_SIGNATURE);
	      setUint16(directoryView, offset + 4, versionMadeBy);
	      arraySet(directoryArray, headerArray, offset + 6);
	      setUint16(directoryView, offset + 30, extraFieldLength);
	      setUint16(directoryView, offset + 32, rawComment.length);
	      setUint32(directoryView, offset + 34, internalFileAttribute);

	      if (externalFileAttribute) {
	        setUint32(directoryView, offset + 38, externalFileAttribute);
	      } else if (directory && msDosCompatible) {
	        setUint8(directoryView, offset + 38, FILE_ATTR_MSDOS_DIR_MASK);
	      }

	      if (_zip) {
	        setUint32(directoryView, offset + 42, MAX_32_BITS);
	      } else {
	        setUint32(directoryView, offset + 42, _fileEntry.offset);
	      }

	      arraySet(directoryArray, rawFilename, offset + 46);
	      arraySet(directoryArray, rawExtraFieldZip64, offset + 46 + rawFilename.length);
	      arraySet(directoryArray, rawExtraFieldAES, offset + 46 + rawFilename.length + rawExtraFieldZip64.length);
	      arraySet(directoryArray, rawExtraFieldExtendedTimestamp, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length);
	      arraySet(directoryArray, rawExtraFieldNTFS, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
	      arraySet(directoryArray, rawExtraField, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
	      arraySet(directoryArray, rawComment, offset + 46 + rawFilename.length + extraFieldLength);
	      offset += 46 + rawFilename.length + extraFieldLength + rawComment.length;

	      if (options.onprogress) {
	        try {
	          options.onprogress(indexFileEntry + 1, files.size, new Entry(_fileEntry));
	        } catch (error) {// ignored
	        }
	      }
	    }
	  } catch (err) {
	    _iterator2.e(err);
	  } finally {
	    _iterator2.f();
	  }

	  if (zip64) {
	    setUint32(directoryView, offset, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
	    setBigUint64(directoryView, offset + 4, BigInt(44));
	    setUint16(directoryView, offset + 12, 45);
	    setUint16(directoryView, offset + 14, 45);
	    setBigUint64(directoryView, offset + 24, BigInt(filesLength));
	    setBigUint64(directoryView, offset + 32, BigInt(filesLength));
	    setBigUint64(directoryView, offset + 40, BigInt(directoryDataLength));
	    setBigUint64(directoryView, offset + 48, BigInt(directoryOffset));
	    setUint32(directoryView, offset + 56, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
	    setBigUint64(directoryView, offset + 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
	    setUint32(directoryView, offset + 72, ZIP64_TOTAL_NUMBER_OF_DISKS);
	    filesLength = MAX_16_BITS;
	    directoryOffset = MAX_32_BITS;
	    directoryDataLength = MAX_32_BITS;
	    offset += 76;
	  }

	  setUint32(directoryView, offset, END_OF_CENTRAL_DIR_SIGNATURE);
	  setUint16(directoryView, offset + 8, filesLength);
	  setUint16(directoryView, offset + 10, filesLength);
	  setUint32(directoryView, offset + 12, directoryDataLength);
	  setUint32(directoryView, offset + 16, directoryOffset);
	  return _await(writer.writeUint8Array(directoryArray), function () {
	    return _invokeIgnored(function () {
	      if (comment && comment.length) {
	        return _awaitIgnored(writer.writeUint8Array(comment));
	      }
	    });
	  });
	});

	var createFileEntry = _async(function (reader, writer, config, options) {
	  var rawFilename = options.rawFilename,
	      lastAccessDate = options.lastAccessDate,
	      creationDate = options.creationDate,
	      password = options.password,
	      level = options.level,
	      zip64 = options.zip64,
	      zipCrypto = options.zipCrypto,
	      dataDescriptor = options.dataDescriptor,
	      dataDescriptorSignature = options.dataDescriptorSignature,
	      directory = options.directory,
	      version = options.version,
	      versionMadeBy = options.versionMadeBy,
	      rawComment = options.rawComment,
	      rawExtraField = options.rawExtraField,
	      useWebWorkers = options.useWebWorkers,
	      onprogress = options.onprogress,
	      signal = options.signal,
	      encryptionStrength = options.encryptionStrength,
	      extendedTimestamp = options.extendedTimestamp,
	      msDosCompatible = options.msDosCompatible,
	      internalFileAttribute = options.internalFileAttribute,
	      externalFileAttribute = options.externalFileAttribute;
	  var encrypted = Boolean(password && password.length);
	  var compressed = level !== 0 && !directory;
	  var rawExtraFieldAES;

	  if (encrypted && !zipCrypto) {
	    rawExtraFieldAES = new Uint8Array(EXTRAFIELD_DATA_AES.length + 2);
	    var extraFieldAESView = getDataView(rawExtraFieldAES);
	    setUint16(extraFieldAESView, 0, EXTRAFIELD_TYPE_AES);
	    arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
	    setUint8(extraFieldAESView, 8, encryptionStrength);
	  } else {
	    rawExtraFieldAES = new Uint8Array(0);
	  }

	  var rawExtraFieldNTFS;
	  var rawExtraFieldExtendedTimestamp;

	  if (extendedTimestamp) {
	    rawExtraFieldExtendedTimestamp = new Uint8Array(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
	    var extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
	    setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
	    setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
	    var extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
	    setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
	    setUint32(extraFieldExtendedTimestampView, 5, Math.floor(options.lastModDate.getTime() / 1000));

	    if (lastAccessDate) {
	      setUint32(extraFieldExtendedTimestampView, 9, Math.floor(lastAccessDate.getTime() / 1000));
	    }

	    if (creationDate) {
	      setUint32(extraFieldExtendedTimestampView, 13, Math.floor(creationDate.getTime() / 1000));
	    }

	    try {
	      rawExtraFieldNTFS = new Uint8Array(36);
	      var extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
	      var lastModTimeNTFS = getTimeNTFS(options.lastModDate);
	      setUint16(extraFieldNTFSView, 0, EXTRAFIELD_TYPE_NTFS);
	      setUint16(extraFieldNTFSView, 2, 32);
	      setUint16(extraFieldNTFSView, 8, EXTRAFIELD_TYPE_NTFS_TAG1);
	      setUint16(extraFieldNTFSView, 10, 24);
	      setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
	      setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
	      setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
	    } catch (error) {
	      rawExtraFieldNTFS = new Uint8Array(0);
	    }
	  } else {
	    rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
	  }

	  var fileEntry = {
	    version: version || VERSION_DEFLATE,
	    versionMadeBy: versionMadeBy,
	    zip64: zip64,
	    directory: Boolean(directory),
	    filenameUTF8: true,
	    rawFilename: rawFilename,
	    commentUTF8: true,
	    rawComment: rawComment,
	    rawExtraFieldZip64: zip64 ? new Uint8Array(EXTRAFIELD_LENGTH_ZIP64 + 4) : new Uint8Array(0),
	    rawExtraFieldExtendedTimestamp: rawExtraFieldExtendedTimestamp,
	    rawExtraFieldNTFS: rawExtraFieldNTFS,
	    rawExtraFieldAES: rawExtraFieldAES,
	    rawExtraField: rawExtraField,
	    extendedTimestamp: extendedTimestamp,
	    msDosCompatible: msDosCompatible,
	    internalFileAttribute: internalFileAttribute,
	    externalFileAttribute: externalFileAttribute
	  };
	  var uncompressedSize = fileEntry.uncompressedSize = 0;
	  var bitFlag = BITFLAG_LANG_ENCODING_FLAG;

	  if (dataDescriptor) {
	    bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
	  }

	  var compressionMethod = COMPRESSION_METHOD_STORE;

	  if (compressed) {
	    compressionMethod = COMPRESSION_METHOD_DEFLATE;
	  }

	  if (zip64) {
	    fileEntry.version = fileEntry.version > VERSION_ZIP64 ? fileEntry.version : VERSION_ZIP64;
	  }

	  if (encrypted) {
	    bitFlag = bitFlag | BITFLAG_ENCRYPTED;

	    if (!zipCrypto) {
	      fileEntry.version = fileEntry.version > VERSION_AES ? fileEntry.version : VERSION_AES;
	      compressionMethod = COMPRESSION_METHOD_AES;

	      if (compressed) {
	        fileEntry.rawExtraFieldAES[9] = COMPRESSION_METHOD_DEFLATE;
	      }
	    }
	  }

	  fileEntry.compressionMethod = compressionMethod;
	  var headerArray = fileEntry.headerArray = new Uint8Array(26);
	  var headerView = getDataView(headerArray);
	  setUint16(headerView, 0, fileEntry.version);
	  setUint16(headerView, 2, bitFlag);
	  setUint16(headerView, 4, compressionMethod);
	  var dateArray = new Uint32Array(1);
	  var dateView = getDataView(dateArray);
	  var lastModDate;

	  if (options.lastModDate < MIN_DATE) {
	    lastModDate = MIN_DATE;
	  } else if (options.lastModDate > MAX_DATE) {
	    lastModDate = MAX_DATE;
	  } else {
	    lastModDate = options.lastModDate;
	  }

	  setUint16(dateView, 0, (lastModDate.getHours() << 6 | lastModDate.getMinutes()) << 5 | lastModDate.getSeconds() / 2);
	  setUint16(dateView, 2, (lastModDate.getFullYear() - 1980 << 4 | lastModDate.getMonth() + 1) << 5 | lastModDate.getDate());
	  var rawLastModDate = dateArray[0];
	  setUint32(headerView, 6, rawLastModDate);
	  setUint16(headerView, 22, rawFilename.length);
	  var extraFieldLength = rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
	  setUint16(headerView, 24, extraFieldLength);
	  var localHeaderArray = new Uint8Array(30 + rawFilename.length + extraFieldLength);
	  var localHeaderView = getDataView(localHeaderArray);
	  setUint32(localHeaderView, 0, LOCAL_FILE_HEADER_SIGNATURE);
	  arraySet(localHeaderArray, headerArray, 4);
	  arraySet(localHeaderArray, rawFilename, 30);
	  arraySet(localHeaderArray, rawExtraFieldAES, 30 + rawFilename.length);
	  arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + rawFilename.length + rawExtraFieldAES.length);
	  arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
	  arraySet(localHeaderArray, fileEntry.rawExtraField, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
	  var result;
	  var compressedSize = 0;
	  return _invoke(function () {
	    if (reader) {
	      uncompressedSize = fileEntry.uncompressedSize = reader.size;
	      return _await(createCodec(config.Deflate, {
	        codecType: CODEC_DEFLATE,
	        level: level,
	        password: password,
	        encryptionStrength: encryptionStrength,
	        zipCrypto: encrypted && zipCrypto,
	        passwordVerification: encrypted && zipCrypto && rawLastModDate >> 8 & 0xFF,
	        signed: true,
	        compressed: compressed,
	        encrypted: encrypted,
	        useWebWorkers: useWebWorkers
	      }, config), function (codec) {
	        return _await(writer.writeUint8Array(localHeaderArray), function () {
	          fileEntry.dataWritten = true;
	          return _await(processData(codec, reader, writer, 0, uncompressedSize, config, {
	            onprogress: onprogress,
	            signal: signal
	          }), function (_processData) {
	            result = _processData;
	            compressedSize = result.length;
	          });
	        });
	      });
	    } else {
	      return _await(writer.writeUint8Array(localHeaderArray), function () {
	        fileEntry.dataWritten = true;
	      });
	    }
	  }, function () {
	    var dataDescriptorArray = new Uint8Array(0);
	    var dataDescriptorView,
	        dataDescriptorOffset = 0;

	    if (dataDescriptor) {
	      dataDescriptorArray = new Uint8Array(zip64 ? dataDescriptorSignature ? 24 : 20 : dataDescriptorSignature ? 16 : 12);
	      dataDescriptorView = getDataView(dataDescriptorArray);

	      if (dataDescriptorSignature) {
	        dataDescriptorOffset = 4;
	        setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
	      }
	    }

	    if (reader) {
	      var signature = result.signature;

	      if ((!encrypted || zipCrypto) && signature !== undefined) {
	        setUint32(headerView, 10, signature);
	        fileEntry.signature = signature;

	        if (dataDescriptor) {
	          setUint32(dataDescriptorView, dataDescriptorOffset, signature);
	        }
	      }

	      if (zip64) {
	        var rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
	        setUint16(rawExtraFieldZip64View, 0, EXTRAFIELD_TYPE_ZIP64);
	        setUint16(rawExtraFieldZip64View, 2, EXTRAFIELD_LENGTH_ZIP64);
	        setUint32(headerView, 14, MAX_32_BITS);
	        setBigUint64(rawExtraFieldZip64View, 12, BigInt(compressedSize));
	        setUint32(headerView, 18, MAX_32_BITS);
	        setBigUint64(rawExtraFieldZip64View, 4, BigInt(uncompressedSize));

	        if (dataDescriptor) {
	          setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
	          setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
	        }
	      } else {
	        setUint32(headerView, 14, compressedSize);
	        setUint32(headerView, 18, uncompressedSize);

	        if (dataDescriptor) {
	          setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
	          setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
	        }
	      }
	    }

	    return _invoke(function () {
	      if (dataDescriptor) {
	        return _awaitIgnored(writer.writeUint8Array(dataDescriptorArray));
	      }
	    }, function () {
	      var length = localHeaderArray.length + compressedSize + dataDescriptorArray.length;
	      Object.assign(fileEntry, {
	        compressedSize: compressedSize,
	        lastModDate: lastModDate,
	        rawLastModDate: rawLastModDate,
	        creationDate: creationDate,
	        lastAccessDate: lastAccessDate,
	        encrypted: encrypted,
	        length: length
	      });
	      return fileEntry;
	    });
	  });
	});

	var getFileEntry = _async(function (zipWriter, name, reader, options) {
	  var files = zipWriter.files;
	  var writer = zipWriter.writer;
	  var previousFileEntry = Array.from(files.values()).pop();
	  var fileEntry = {};
	  var bufferedWrite;
	  var resolveLockUnbufferedWrite;
	  var resolveLockCurrentFileEntry;
	  files.set(name, fileEntry);
	  return _finallyRethrows(function () {
	    return _catch(function () {
	      var lockPreviousFileEntry;
	      var fileWriter;
	      var lockCurrentFileEntry;

	      if (options.keepOrder) {
	        lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
	      }

	      fileEntry.lock = lockCurrentFileEntry = new Promise(function (resolve) {
	        return resolveLockCurrentFileEntry = resolve;
	      });
	      return _invoke(function () {
	        if (options.bufferedWrite || zipWriter.lockWrite || !options.dataDescriptor) {
	          fileWriter = new BlobWriter();
	          fileWriter.init();
	          bufferedWrite = true;
	        } else {
	          zipWriter.lockWrite = new Promise(function (resolve) {
	            return resolveLockUnbufferedWrite = resolve;
	          });
	          return _invoke(function () {
	            if (!writer.initialized) {
	              return _awaitIgnored(writer.init());
	            }
	          }, function () {
	            fileWriter = writer;
	          });
	        }
	      }, function () {
	        return _await(createFileEntry(reader, fileWriter, zipWriter.config, options), function (_createFileEntry) {
	          fileEntry = _createFileEntry;
	          fileEntry.lock = lockCurrentFileEntry;
	          files.set(name, fileEntry);
	          fileEntry.filename = name;
	          return _invoke(function () {
	            if (bufferedWrite) {
	              var indexWrittenData = 0;
	              var blob = fileWriter.getData();
	              return _await(Promise.all([zipWriter.lockWrite, lockPreviousFileEntry]), function () {
	                var pendingFileEntry;
	                return _continue(_do(function () {
	                  pendingFileEntry = Array.from(files.values()).find(function (fileEntry) {
	                    return fileEntry.writingBufferedData;
	                  });
	                  return _invokeIgnored(function () {
	                    if (pendingFileEntry) {
	                      return _awaitIgnored(pendingFileEntry.lock);
	                    }
	                  });
	                }, function () {
	                  return !!pendingFileEntry && !!pendingFileEntry.lock;
	                }), function () {
	                  fileEntry.writingBufferedData = true;
	                  return _invoke(function () {
	                    if (!options.dataDescriptor) {
	                      var headerLength = 26;
	                      return _await(sliceAsArrayBuffer(blob, 0, headerLength), function (arrayBuffer) {
	                        var arrayBufferView = new DataView(arrayBuffer);

	                        if (!fileEntry.encrypted || options.zipCrypto) {
	                          setUint32(arrayBufferView, 14, fileEntry.signature);
	                        }

	                        if (fileEntry.zip64) {
	                          setUint32(arrayBufferView, 18, MAX_32_BITS);
	                          setUint32(arrayBufferView, 22, MAX_32_BITS);
	                        } else {
	                          setUint32(arrayBufferView, 18, fileEntry.compressedSize);
	                          setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
	                        }

	                        return _await(writer.writeUint8Array(new Uint8Array(arrayBuffer)), function () {
	                          indexWrittenData = headerLength;
	                        });
	                      });
	                    }
	                  }, function () {
	                    return _await(writeBlob(writer, blob, indexWrittenData), function () {
	                      delete fileEntry.writingBufferedData;
	                    });
	                  });
	                });
	              });
	            }
	          }, function () {
	            fileEntry.offset = zipWriter.offset;

	            if (fileEntry.zip64) {
	              var rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
	              setBigUint64(rawExtraFieldZip64View, 20, BigInt(fileEntry.offset));
	            } else if (fileEntry.offset >= MAX_32_BITS) {
	              throw new Error(ERR_UNSUPPORTED_FORMAT);
	            }

	            zipWriter.offset += fileEntry.length;
	            return fileEntry;
	          });
	        });
	      });
	    }, function (error) {
	      if (bufferedWrite && fileEntry.writingBufferedData || !bufferedWrite && fileEntry.dataWritten) {
	        error.corruptedEntry = zipWriter.hasCorruptedEntries = true;

	        if (fileEntry.uncompressedSize) {
	          zipWriter.offset += fileEntry.uncompressedSize;
	        }
	      }

	      files.delete(name);
	      throw error;
	    });
	  }, function (_wasThrown2, _result3) {
	    resolveLockCurrentFileEntry();

	    if (resolveLockUnbufferedWrite) {
	      resolveLockUnbufferedWrite();
	    }

	    return _rethrow(_wasThrown2, _result3);
	  });
	});

	var addFile = _async(function (zipWriter, name, reader, options) {
	  name = name.trim();

	  if (options.directory && !name.endsWith(DIRECTORY_SIGNATURE)) {
	    name += DIRECTORY_SIGNATURE;
	  } else {
	    options.directory = name.endsWith(DIRECTORY_SIGNATURE);
	  }

	  if (zipWriter.files.has(name)) {
	    throw new Error(ERR_DUPLICATED_NAME);
	  }

	  var rawFilename = encodeText(name);

	  if (rawFilename.length > MAX_16_BITS) {
	    throw new Error(ERR_INVALID_ENTRY_NAME);
	  }

	  var comment = options.comment || "";
	  var rawComment = encodeText(comment);

	  if (rawComment.length > MAX_16_BITS) {
	    throw new Error(ERR_INVALID_ENTRY_COMMENT);
	  }

	  var version = zipWriter.options.version || options.version || 0;

	  if (version > MAX_16_BITS) {
	    throw new Error(ERR_INVALID_VERSION);
	  }

	  var versionMadeBy = zipWriter.options.versionMadeBy || options.versionMadeBy || 20;

	  if (versionMadeBy > MAX_16_BITS) {
	    throw new Error(ERR_INVALID_VERSION);
	  }

	  var lastModDate = getOptionValue(zipWriter, options, "lastModDate") || new Date();
	  var lastAccessDate = getOptionValue(zipWriter, options, "lastAccessDate");
	  var creationDate = getOptionValue(zipWriter, options, "creationDate");
	  var password = getOptionValue(zipWriter, options, "password");
	  var encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength") || 3;
	  var zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");

	  if (password !== undefined && encryptionStrength !== undefined && (encryptionStrength < 1 || encryptionStrength > 3)) {
	    throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
	  }

	  var rawExtraField = new Uint8Array(0);
	  var extraField = options.extraField;

	  if (extraField) {
	    var extraFieldSize = 0;
	    var offset = 0;
	    extraField.forEach(function (data) {
	      return extraFieldSize += 4 + data.length;
	    });
	    rawExtraField = new Uint8Array(extraFieldSize);
	    extraField.forEach(function (data, type) {
	      if (type > MAX_16_BITS) {
	        throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
	      }

	      if (data.length > MAX_16_BITS) {
	        throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
	      }

	      arraySet(rawExtraField, new Uint16Array([type]), offset);
	      arraySet(rawExtraField, new Uint16Array([data.length]), offset + 2);
	      arraySet(rawExtraField, data, offset + 4);
	      offset += 4 + data.length;
	    });
	  }

	  var extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp");

	  if (extendedTimestamp === undefined) {
	    extendedTimestamp = true;
	  }

	  var maximumCompressedSize = 0;
	  var keepOrder = getOptionValue(zipWriter, options, "keepOrder");

	  if (keepOrder === undefined) {
	    keepOrder = true;
	  }

	  var uncompressedSize = 0;
	  var msDosCompatible = getOptionValue(zipWriter, options, "msDosCompatible");

	  if (msDosCompatible === undefined) {
	    msDosCompatible = true;
	  }

	  var internalFileAttribute = getOptionValue(zipWriter, options, "internalFileAttribute") || 0;
	  var externalFileAttribute = getOptionValue(zipWriter, options, "externalFileAttribute") || 0;
	  return _invoke(function () {
	    if (reader) {
	      return _invoke(function () {
	        if (!reader.initialized) {
	          return _awaitIgnored(reader.init());
	        }
	      }, function () {
	        uncompressedSize = reader.size;
	        maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
	      });
	    }
	  }, function () {
	    var zip64 = options.zip64 || zipWriter.options.zip64 || false;

	    if (zipWriter.offset + zipWriter.pendingCompressedSize >= MAX_32_BITS || uncompressedSize >= MAX_32_BITS || maximumCompressedSize >= MAX_32_BITS) {
	      if (options.zip64 === false || zipWriter.options.zip64 === false || !keepOrder) {
	        throw new Error(ERR_UNSUPPORTED_FORMAT);
	      } else {
	        zip64 = true;
	      }
	    }

	    zipWriter.pendingCompressedSize += maximumCompressedSize;
	    return _await(Promise.resolve(), function () {
	      var level = getOptionValue(zipWriter, options, "level");
	      var useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
	      var bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
	      var dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor");
	      var dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature");
	      var signal = getOptionValue(zipWriter, options, "signal");

	      if (dataDescriptor === undefined) {
	        dataDescriptor = true;
	      }

	      if (dataDescriptor && dataDescriptorSignature === undefined) {
	        dataDescriptorSignature = true;
	      }

	      return _await(getFileEntry(zipWriter, name, reader, Object.assign({}, options, {
	        rawFilename: rawFilename,
	        rawComment: rawComment,
	        version: version,
	        versionMadeBy: versionMadeBy,
	        lastModDate: lastModDate,
	        lastAccessDate: lastAccessDate,
	        creationDate: creationDate,
	        rawExtraField: rawExtraField,
	        zip64: zip64,
	        password: password,
	        level: level,
	        useWebWorkers: useWebWorkers,
	        encryptionStrength: encryptionStrength,
	        extendedTimestamp: extendedTimestamp,
	        zipCrypto: zipCrypto,
	        bufferedWrite: bufferedWrite,
	        keepOrder: keepOrder,
	        dataDescriptor: dataDescriptor,
	        dataDescriptorSignature: dataDescriptorSignature,
	        signal: signal,
	        msDosCompatible: msDosCompatible,
	        internalFileAttribute: internalFileAttribute,
	        externalFileAttribute: externalFileAttribute
	      })), function (fileEntry) {
	        if (maximumCompressedSize) {
	          zipWriter.pendingCompressedSize -= maximumCompressedSize;
	        }

	        Object.assign(fileEntry, {
	          name: name,
	          comment: comment,
	          extraField: extraField
	        });
	        return new Entry(fileEntry);
	      });
	    });
	  });
	});

	var ERR_DUPLICATED_NAME = "File already exists";
	var ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
	var ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
	var ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
	var ERR_INVALID_VERSION = "Version exceeds 65535";
	var ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
	var ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
	var ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
	var ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported";
	var EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
	var EXTRAFIELD_LENGTH_ZIP64 = 24;
	var workers = 0;

	var ZipWriter = /*#__PURE__*/function () {
	  function ZipWriter(writer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, ZipWriter);

	    Object.assign(this, {
	      writer: writer,
	      options: options,
	      config: getConfiguration(),
	      files: new Map(),
	      offset: writer.size,
	      pendingCompressedSize: 0,
	      pendingEntries: []
	    });
	  }

	  _createClass(ZipWriter, [{
	    key: "add",
	    value: function add() {
	      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	      var reader = arguments.length > 1 ? arguments[1] : undefined;
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      try {
	        var _this2 = this;

	        var zipWriter = _this2;
	        return _await(function () {
	          if (workers < zipWriter.config.maxWorkers) {
	            workers++;
	            return _finallyRethrows(function () {
	              return _await(addFile(zipWriter, name, reader, options));
	            }, function (_wasThrown, _result) {
	              workers--;
	              var pendingEntry = zipWriter.pendingEntries.shift();

	              if (pendingEntry) {
	                zipWriter.add(pendingEntry.name, pendingEntry.reader, pendingEntry.options).then(pendingEntry.resolve).catch(pendingEntry.reject);
	              }

	              return _rethrow(_wasThrown, _result);
	            });
	          } else {
	            return new Promise(function (resolve, reject) {
	              return zipWriter.pendingEntries.push({
	                name: name,
	                reader: reader,
	                options: options,
	                resolve: resolve,
	                reject: reject
	              });
	            });
	          }
	        }());
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "close",
	    value: function close(comment) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this4 = this;

	        if (comment === undefined) comment = new Uint8Array(0);
	        return _await(closeFile(_this4, comment, options), function () {
	          return _this4.writer.getData();
	        });
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return ZipWriter;
	}();

	function sliceAsArrayBuffer(blob, start, end) {
	  if (blob.arrayBuffer) {
	    if (start || end) {
	      return blob.slice(start, end).arrayBuffer();
	    } else {
	      return blob.arrayBuffer();
	    }
	  } else {
	    var fileReader = new FileReader();
	    return new Promise(function (resolve, reject) {
	      fileReader.onload = function (event) {
	        return resolve(event.target.result);
	      };

	      fileReader.onerror = function () {
	        return reject(fileReader.error);
	      };

	      fileReader.readAsArrayBuffer(start || end ? blob.slice(start, end) : blob);
	    });
	  }
	}

	function getTimeNTFS(date) {
	  if (date) {
	    return (BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000);
	  }
	}

	function getOptionValue(zipWriter, options, name) {
	  return options[name] === undefined ? zipWriter.options[name] : options[name];
	}

	function getMaximumCompressedSize(uncompressedSize) {
	  return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
	}

	function setUint8(view, offset, value) {
	  view.setUint8(offset, value);
	}

	function setUint16(view, offset, value) {
	  view.setUint16(offset, value, true);
	}

	function setUint32(view, offset, value) {
	  view.setUint32(offset, value, true);
	}

	function setBigUint64(view, offset, value) {
	  view.setBigUint64(offset, value, true);
	}

	function arraySet(array, typedArray, offset) {
	  array.set(typedArray, offset);
	}

	function getDataView(array) {
	  return new DataView(array.buffer);
	}

	var $ = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var pipe = function pipe(reader, writer) {
	  var copyChunk = _async(function () {
	    var chunkIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var index = chunkIndex * CHUNK_SIZE;

	    if (index < reader.size) {
	      return _await(reader.readUint8Array(index, Math.min(CHUNK_SIZE, reader.size - index)), function (array) {
	        return _await(writer.writeUint8Array(array), function () {
	          return copyChunk(chunkIndex + 1);
	        });
	      });
	    } else {
	      return writer.getData();
	    }
	  });

	  return copyChunk();
	};

	var _addFileSystemEntry = _async(function (zipEntry, fileSystemEntry) {
	  var addDirectory = _async(function (zipEntry, fileEntry) {
	    return _await(getChildren(fileEntry), function (children) {
	      return _continueIgnored(_forOf(children, function (child) {
	        return _invokeIgnored(function () {
	          if (child.isDirectory) {
	            return _awaitIgnored(addDirectory(zipEntry.addDirectory(child.name), child));
	          } else {
	            return _awaitIgnored(new Promise(function (resolve, reject) {
	              child.file(function (file) {
	                var childZipEntry = zipEntry.addBlob(child.name, file);
	                childZipEntry.uncompressedSize = file.size;
	                resolve(childZipEntry);
	              }, reject);
	            }));
	          }
	        });
	      }));
	    });
	  });

	  function getChildren(fileEntry) {
	    return new Promise(function (resolve, reject) {
	      var entries = [];

	      if (fileEntry.isDirectory) {
	        readEntries(fileEntry.createReader());
	      }

	      if (fileEntry.isFile) {
	        resolve(entries);
	      }

	      function readEntries(directoryReader) {
	        directoryReader.readEntries(function (temporaryEntries) {
	          if (!temporaryEntries.length) {
	            resolve(entries);
	          } else {
	            entries = entries.concat(temporaryEntries);
	            readEntries(directoryReader);
	          }
	        }, reject);
	      }
	    });
	  }

	  if (fileSystemEntry.isDirectory) {
	    var entry = zipEntry.addDirectory(fileSystemEntry.name);
	    return _await(addDirectory(entry, fileSystemEntry), function () {
	      return entry;
	    });
	  } else {
	    return new Promise(function (resolve, reject) {
	      return fileSystemEntry.file(function (file) {
	        return resolve(zipEntry.addBlob(fileSystemEntry.name, file));
	      }, reject);
	    });
	  }
	});

	var _exportZip = _async(function (zipWriter, entry, totalSize, options) {
	  var process = _async(function (zipWriter, entry) {
	    var processChild = _async(function (child) {
	      var name = options.relativePath ? child.getRelativeName(selectedEntry) : child.getFullname();
	      return _await(zipWriter.add(name, child.reader, Object.assign({
	        directory: child.directory
	      }, Object.assign({}, options, {
	        onprogress: function onprogress(indexProgress) {
	          if (options.onprogress) {
	            entryOffsets.set(name, indexProgress);

	            try {
	              options.onprogress(Array.from(entryOffsets.values()).reduce(function (previousValue, currentValue) {
	                return previousValue + currentValue;
	              }), totalSize);
	            } catch (error) {// ignored
	            }
	          }
	        }
	      }))), function () {
	        return _awaitIgnored(process(zipWriter, child));
	      });
	    });

	    var exportChild = _async(function () {
	      return _invokeIgnored(function () {
	        if (options.bufferedWrite) {
	          return _awaitIgnored(Promise.all(entry.children.map(processChild)));
	        } else {
	          return _continueIgnored(_forOf(entry.children, function (child) {
	            return _awaitIgnored(processChild(child));
	          }));
	        }
	      });
	    });

	    return _callIgnored(exportChild);
	  });

	  var selectedEntry = entry;
	  var entryOffsets = new Map();
	  return _awaitIgnored(process(zipWriter, entry));
	});

	var initReaders = _async(function (entry) {
	  return _invokeIgnored(function () {
	    if (entry.children.length) {
	      return _continueIgnored(_forOf(entry.children, function (child) {
	        return _invokeIgnored(function () {
	          if (child.directory) {
	            return _awaitIgnored(initReaders(child));
	          } else {
	            child.reader = new child.Reader(child.data);
	            return _await(child.reader.init(), function () {
	              child.uncompressedSize = child.reader.size;
	            });
	          }
	        });
	      }));
	    }
	  });
	});
	var CHUNK_SIZE = 512 * 1024;

	var ZipEntry = /*#__PURE__*/function () {
	  function ZipEntry(fs, name, params, parent) {
	    _classCallCheck(this, ZipEntry);

	    var zipEntry = this;

	    if (fs.root && parent && parent.getChildByName(name)) {
	      throw new Error("Entry filename already exists");
	    }

	    if (!params) {
	      params = {};
	    }

	    Object.assign(zipEntry, {
	      fs: fs,
	      name: name,
	      data: params.data,
	      id: fs.entries.length,
	      parent: parent,
	      children: [],
	      uncompressedSize: 0
	    });
	    fs.entries.push(zipEntry);

	    if (parent) {
	      zipEntry.parent.children.push(zipEntry);
	    }
	  }

	  _createClass(ZipEntry, [{
	    key: "moveTo",
	    value: function moveTo(target) {
	      // deprecated
	      var zipEntry = this;
	      zipEntry.fs.move(zipEntry, target);
	    }
	  }, {
	    key: "getFullname",
	    value: function getFullname() {
	      return this.getRelativeName();
	    }
	  }, {
	    key: "getRelativeName",
	    value: function getRelativeName() {
	      var ancestor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fs.root;
	      var zipEntry = this;
	      var relativeName = zipEntry.name;
	      var entry = zipEntry.parent;

	      while (entry && entry != ancestor) {
	        relativeName = (entry.name ? entry.name + "/" : "") + relativeName;
	        entry = entry.parent;
	      }

	      return relativeName;
	    }
	  }, {
	    key: "isDescendantOf",
	    value: function isDescendantOf(ancestor) {
	      var entry = this.parent;

	      while (entry && entry.id != ancestor.id) {
	        entry = entry.parent;
	      }

	      return Boolean(entry);
	    }
	  }]);

	  return ZipEntry;
	}();

	var ZipFileEntry = /*#__PURE__*/function (_ZipEntry) {
	  _inherits(ZipFileEntry, _ZipEntry);

	  var _super = _createSuper(ZipFileEntry);

	  function ZipFileEntry(fs, name, params, parent) {
	    var _this;

	    _classCallCheck(this, ZipFileEntry);

	    _this = _super.call(this, fs, name, params, parent);

	    var zipEntry = _assertThisInitialized(_this);

	    zipEntry.Reader = params.Reader;
	    zipEntry.Writer = params.Writer;

	    if (params.getData) {
	      zipEntry.getData = params.getData;
	    }

	    return _this;
	  }

	  _createClass(ZipFileEntry, [{
	    key: "getData",
	    value: function getData(writer) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this3 = this;

	        var zipEntry = _this3;

	        if (!writer || writer.constructor == zipEntry.Writer && zipEntry.data) {
	          return _await(zipEntry.data);
	        } else {
	          zipEntry.reader = new zipEntry.Reader(zipEntry.data, options);
	          return _await(zipEntry.reader.init(), function () {
	            return _invoke(function () {
	              if (!writer.initialized) {
	                return _awaitIgnored(writer.init());
	              }
	            }, function () {
	              zipEntry.uncompressedSize = zipEntry.reader.size;
	              return pipe(zipEntry.reader, writer);
	            });
	          });
	        }
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "getText",
	    value: function getText(encoding, options) {
	      return this.getData(new TextWriter(encoding), options);
	    }
	  }, {
	    key: "getBlob",
	    value: function getBlob(mimeType, options) {
	      return this.getData(new BlobWriter(mimeType), options);
	    }
	  }, {
	    key: "getData64URI",
	    value: function getData64URI(mimeType, options) {
	      return this.getData(new Data64URIWriter(mimeType), options);
	    }
	  }, {
	    key: "getUint8Array",
	    value: function getUint8Array(options) {
	      return this.getData(new Uint8ArrayWriter(), options);
	    }
	  }, {
	    key: "replaceBlob",
	    value: function replaceBlob(blob) {
	      Object.assign(this, {
	        data: blob,
	        Reader: BlobReader,
	        Writer: BlobWriter,
	        reader: null
	      });
	    }
	  }, {
	    key: "replaceText",
	    value: function replaceText(text) {
	      Object.assign(this, {
	        data: text,
	        Reader: TextReader,
	        Writer: TextWriter,
	        reader: null
	      });
	    }
	  }, {
	    key: "replaceData64URI",
	    value: function replaceData64URI(dataURI) {
	      Object.assign(this, {
	        data: dataURI,
	        Reader: Data64URIReader,
	        Writer: Data64URIWriter,
	        reader: null
	      });
	    }
	  }, {
	    key: "replaceUint8Array",
	    value: function replaceUint8Array(array) {
	      Object.assign(this, {
	        data: array,
	        Reader: Uint8ArrayReader,
	        Writer: Uint8ArrayWriter,
	        reader: null
	      });
	    }
	  }]);

	  return ZipFileEntry;
	}(ZipEntry);

	var ZipDirectoryEntry = /*#__PURE__*/function (_ZipEntry2) {
	  _inherits(ZipDirectoryEntry, _ZipEntry2);

	  var _super2 = _createSuper(ZipDirectoryEntry);

	  function ZipDirectoryEntry(fs, name, params, parent) {
	    var _this4;

	    _classCallCheck(this, ZipDirectoryEntry);

	    _this4 = _super2.call(this, fs, name, params, parent);
	    _this4.directory = true;
	    return _this4;
	  }

	  _createClass(ZipDirectoryEntry, [{
	    key: "addDirectory",
	    value: function addDirectory(name) {
	      return addChild(this, name, null, true);
	    }
	  }, {
	    key: "addText",
	    value: function addText(name, text) {
	      return addChild(this, name, {
	        data: text,
	        Reader: TextReader,
	        Writer: TextWriter
	      });
	    }
	  }, {
	    key: "addBlob",
	    value: function addBlob(name, blob) {
	      return addChild(this, name, {
	        data: blob,
	        Reader: BlobReader,
	        Writer: BlobWriter
	      });
	    }
	  }, {
	    key: "addData64URI",
	    value: function addData64URI(name, dataURI) {
	      return addChild(this, name, {
	        data: dataURI,
	        Reader: Data64URIReader,
	        Writer: Data64URIWriter
	      });
	    }
	  }, {
	    key: "addUint8Array",
	    value: function addUint8Array(name, array) {
	      return addChild(this, name, {
	        data: array,
	        Reader: Uint8ArrayReader,
	        Writer: Uint8ArrayWriter
	      });
	    }
	  }, {
	    key: "addHttpContent",
	    value: function addHttpContent(name, url) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return addChild(this, name, {
	        data: url,
	        Reader: /*#__PURE__*/function (_HttpReader) {
	          _inherits(Reader, _HttpReader);

	          var _super3 = _createSuper(Reader);

	          function Reader(url) {
	            _classCallCheck(this, Reader);

	            return _super3.call(this, url, options);
	          }

	          return _createClass(Reader);
	        }(HttpReader)
	      });
	    }
	  }, {
	    key: "addFileSystemEntry",
	    value: function addFileSystemEntry(fileSystemEntry) {
	      var _this5 = this;

	      return _addFileSystemEntry(_this5, fileSystemEntry);
	    }
	  }, {
	    key: "addData",
	    value: function addData(name, params) {
	      try {
	        var _this7 = this;

	        return _await(addChild(_this7, name, params));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importBlob",
	    value: function importBlob(blob) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this9 = this;

	        return _await(_awaitIgnored(_this9.importZip(new BlobReader(blob), options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importData64URI",
	    value: function importData64URI(dataURI) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this11 = this;

	        return _await(_awaitIgnored(_this11.importZip(new Data64URIReader(dataURI), options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importUint8Array",
	    value: function importUint8Array(array) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this13 = this;

	        return _await(_awaitIgnored(_this13.importZip(new Uint8ArrayReader(array), options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importHttpContent",
	    value: function importHttpContent(url) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      try {
	        var _this15 = this;

	        return _await(_awaitIgnored(_this15.importZip(new HttpReader(url, options), options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportBlob",
	    value: function exportBlob() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      try {
	        var _this17 = this;

	        return _await(_this17.exportZip(new BlobWriter("application/zip"), options));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportData64URI",
	    value: function exportData64URI() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      try {
	        var _this19 = this;

	        return _await(_this19.exportZip(new Data64URIWriter("application/zip"), options));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportUint8Array",
	    value: function exportUint8Array() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      try {
	        var _this21 = this;

	        return _await(_this21.exportZip(new Uint8ArrayWriter(), options));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importZip",
	    value: function importZip(reader, options) {
	      try {
	        var _this23 = this;

	        return _await(_invoke(function () {
	          if (!reader.initialized) {
	            return _awaitIgnored(reader.init());
	          }
	        }, function () {
	          var zipReader = new ZipReader(reader, options);
	          return _await(zipReader.getEntries(), function (entries) {
	            entries.forEach(function (entry) {
	              var parent = _this23;
	              var path = entry.filename.split("/");
	              var name = path.pop();
	              path.forEach(function (pathPart) {
	                return parent = parent.getChildByName(pathPart) || new ZipDirectoryEntry(_this23.fs, pathPart, null, parent);
	              });

	              if (!entry.directory) {
	                addChild(parent, name, {
	                  data: entry,
	                  Reader: getZipBlobReader(Object.assign({}, options))
	                });
	              }
	            });
	          });
	        }));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportZip",
	    value: function exportZip(writer, options) {
	      var _this24 = this;

	      var zipEntry = _this24;
	      return _await(initReaders(zipEntry), function () {
	        return _await(writer.init(), function () {
	          var zipWriter = new ZipWriter(writer, options);
	          return _await(_exportZip(zipWriter, zipEntry, getTotalSize([zipEntry], "uncompressedSize"), options), function () {
	            return _await(zipWriter.close(), function () {
	              return writer.getData();
	            });
	          });
	        });
	      });
	    }
	  }, {
	    key: "getChildByName",
	    value: function getChildByName(name) {
	      var children = this.children;

	      for (var childIndex = 0; childIndex < children.length; childIndex++) {
	        var child = children[childIndex];

	        if (child.name == name) {
	          return child;
	        }
	      }
	    }
	  }]);

	  return ZipDirectoryEntry;
	}(ZipEntry);

	var FS = /*#__PURE__*/function () {
	  function FS() {
	    _classCallCheck(this, FS);

	    resetFS(this);
	  }

	  _createClass(FS, [{
	    key: "children",
	    get: function get() {
	      return this.root.children;
	    }
	  }, {
	    key: "remove",
	    value: function remove(entry) {
	      detach(entry);
	      this.entries[entry.id] = null;
	    }
	  }, {
	    key: "move",
	    value: function move(entry, destination) {
	      if (entry == this.root) {
	        throw new Error("Root directory cannot be moved");
	      } else {
	        if (destination.directory) {
	          if (!destination.isDescendantOf(entry)) {
	            if (entry != destination) {
	              if (destination.getChildByName(entry.name)) {
	                throw new Error("Entry filename already exists");
	              }

	              detach(entry);
	              entry.parent = destination;
	              destination.children.push(entry);
	            }
	          } else {
	            throw new Error("Entry is a ancestor of target entry");
	          }
	        } else {
	          throw new Error("Target entry is not a directory");
	        }
	      }
	    }
	  }, {
	    key: "find",
	    value: function find(fullname) {
	      var path = fullname.split("/");
	      var node = this.root;

	      for (var index = 0; node && index < path.length; index++) {
	        node = node.getChildByName(path[index]);
	      }

	      return node;
	    }
	  }, {
	    key: "getById",
	    value: function getById(id) {
	      return this.entries[id];
	    }
	  }, {
	    key: "getChildByName",
	    value: function getChildByName(name) {
	      return this.root.getChildByName(name);
	    }
	  }, {
	    key: "addDirectory",
	    value: function addDirectory(name) {
	      return this.root.addDirectory(name);
	    }
	  }, {
	    key: "addText",
	    value: function addText(name, text) {
	      return this.root.addText(name, text);
	    }
	  }, {
	    key: "addBlob",
	    value: function addBlob(name, blob) {
	      return this.root.addBlob(name, blob);
	    }
	  }, {
	    key: "addData64URI",
	    value: function addData64URI(name, dataURI) {
	      return this.root.addData64URI(name, dataURI);
	    }
	  }, {
	    key: "addHttpContent",
	    value: function addHttpContent(name, url, options) {
	      return this.root.addHttpContent(name, url, options);
	    }
	  }, {
	    key: "addFileSystemEntry",
	    value: function addFileSystemEntry(fileSystemEntry) {
	      try {
	        var _this26 = this;

	        return _await(_this26.root.addFileSystemEntry(fileSystemEntry));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "addData",
	    value: function addData(name, params) {
	      try {
	        var _this28 = this;

	        return _await(_this28.root.addData(name, params));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importBlob",
	    value: function importBlob(blob, options) {
	      try {
	        var _this30 = this;

	        resetFS(_this30);
	        return _await(_awaitIgnored(_this30.root.importBlob(blob, options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importData64URI",
	    value: function importData64URI(dataURI, options) {
	      try {
	        var _this32 = this;

	        resetFS(_this32);
	        return _await(_awaitIgnored(_this32.root.importData64URI(dataURI, options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "importHttpContent",
	    value: function importHttpContent(url, options) {
	      try {
	        var _this34 = this;

	        resetFS(_this34);
	        return _await(_awaitIgnored(_this34.root.importHttpContent(url, options)));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportBlob",
	    value: function exportBlob(options) {
	      try {
	        var _this36 = this;

	        return _await(_this36.root.exportBlob(options));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }, {
	    key: "exportData64URI",
	    value: function exportData64URI(options) {
	      try {
	        var _this38 = this;

	        return _await(_this38.root.exportData64URI(options));
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	  }]);

	  return FS;
	}();

	var fs = {
	  FS: FS,
	  ZipDirectoryEntry: ZipDirectoryEntry,
	  ZipFileEntry: ZipFileEntry
	};

	function getTotalSize(entries, propertyName) {
	  var size = 0;
	  entries.forEach(process);
	  return size;

	  function process(entry) {
	    size += entry[propertyName];

	    if (entry.children) {
	      entry.children.forEach(process);
	    }
	  }
	}

	function getZipBlobReader(options) {
	  return /*#__PURE__*/function (_Reader) {
	    _inherits(_class, _Reader);

	    var _super4 = _createSuper(_class);

	    function _class(entry) {
	      var _this39;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      _classCallCheck(this, _class);

	      _this39 = _super4.call(this);
	      _this39.entry = entry;
	      _this39.options = options;
	      return _this39;
	    }

	    _createClass(_class, [{
	      key: "init",
	      value: function init() {
	        try {
	          var _this41 = this;

	          var zipBlobReader = _this41;
	          zipBlobReader.size = zipBlobReader.entry.uncompressedSize;
	          return _await(zipBlobReader.entry.getData(new BlobWriter(), Object.assign({}, zipBlobReader.options, options)), function (data) {
	            zipBlobReader.data = data;
	            zipBlobReader.blobReader = new BlobReader(data);
	          });
	        } catch (e) {
	          return Promise.reject(e);
	        }
	      }
	    }, {
	      key: "readUint8Array",
	      value: function readUint8Array(index, length) {
	        try {
	          var _this43 = this;

	          return _await(_this43.blobReader.readUint8Array(index, length));
	        } catch (e) {
	          return Promise.reject(e);
	        }
	      }
	    }]);

	    return _class;
	  }(Reader);
	}

	function detach(entry) {
	  var children = entry.parent.children;
	  children.forEach(function (child, index) {
	    if (child.id == entry.id) {
	      children.splice(index, 1);
	    }
	  });
	}

	function resetFS(fs) {
	  fs.entries = [];
	  fs.root = new ZipDirectoryEntry(fs);
	}

	function addChild(parent, name, params, directory) {
	  if (parent.directory) {
	    return directory ? new ZipDirectoryEntry(parent.fs, name, params, parent) : new ZipFileEntry(parent.fs, name, params, parent);
	  } else {
	    throw new Error("Parent entry is not a directory");
	  }
	}

	/*
	 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

	 Redistribution and use in source and binary forms, with or without
	 modification, are permitted provided that the following conditions are met:

	 1. Redistributions of source code must retain the above copyright notice,
	 this list of conditions and the following disclaimer.

	 2. Redistributions in binary form must reproduce the above copyright 
	 notice, this list of conditions and the following disclaimer in 
	 the documentation and/or other materials provided with the distribution.

	 3. The names of the authors may not be used to endorse or promote products
	 derived from this software without specific prior written permission.

	 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
	 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
	 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
	 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
	 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	var baseURL;

	try {
	  baseURL = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('zip-fs-es5.js', document.baseURI).href));
	} catch (error) {// ignored
	}

	configure({
	  baseURL: baseURL
	});
	b(configure);

	exports.BlobReader = BlobReader;
	exports.BlobWriter = BlobWriter;
	exports.Data64URIReader = Data64URIReader;
	exports.Data64URIWriter = Data64URIWriter;
	exports.ERR_ABORT = ERR_ABORT;
	exports.ERR_BAD_FORMAT = ERR_BAD_FORMAT;
	exports.ERR_CENTRAL_DIRECTORY_NOT_FOUND = ERR_CENTRAL_DIRECTORY_NOT_FOUND;
	exports.ERR_DUPLICATED_NAME = ERR_DUPLICATED_NAME;
	exports.ERR_ENCRYPTED = ERR_ENCRYPTED;
	exports.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND;
	exports.ERR_EOCDR_NOT_FOUND = ERR_EOCDR_NOT_FOUND;
	exports.ERR_EOCDR_ZIP64_NOT_FOUND = ERR_EOCDR_ZIP64_NOT_FOUND;
	exports.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = ERR_EXTRAFIELD_ZIP64_NOT_FOUND;
	exports.ERR_HTTP_RANGE = ERR_HTTP_RANGE;
	exports.ERR_INVALID_COMMENT = ERR_INVALID_COMMENT;
	exports.ERR_INVALID_ENCRYPTION_STRENGTH = ERR_INVALID_ENCRYPTION_STRENGTH;
	exports.ERR_INVALID_ENTRY_COMMENT = ERR_INVALID_ENTRY_COMMENT;
	exports.ERR_INVALID_ENTRY_NAME = ERR_INVALID_ENTRY_NAME;
	exports.ERR_INVALID_EXTRAFIELD_DATA = ERR_INVALID_EXTRAFIELD_DATA;
	exports.ERR_INVALID_EXTRAFIELD_TYPE = ERR_INVALID_EXTRAFIELD_TYPE;
	exports.ERR_INVALID_PASSWORD = ERR_INVALID_PASSWORD;
	exports.ERR_INVALID_SIGNATURE = ERR_INVALID_SIGNATURE;
	exports.ERR_INVALID_VERSION = ERR_INVALID_VERSION;
	exports.ERR_LOCAL_FILE_HEADER_NOT_FOUND = ERR_LOCAL_FILE_HEADER_NOT_FOUND;
	exports.ERR_UNSUPPORTED_COMPRESSION = ERR_UNSUPPORTED_COMPRESSION;
	exports.ERR_UNSUPPORTED_ENCRYPTION = ERR_UNSUPPORTED_ENCRYPTION;
	exports.ERR_UNSUPPORTED_FORMAT = ERR_UNSUPPORTED_FORMAT;
	exports.HttpRangeReader = HttpRangeReader;
	exports.HttpReader = HttpReader;
	exports.Reader = Reader;
	exports.TextReader = TextReader;
	exports.TextWriter = TextWriter;
	exports.Uint8ArrayReader = Uint8ArrayReader;
	exports.Uint8ArrayWriter = Uint8ArrayWriter;
	exports.WritableStreamWriter = WritableStreamWriter;
	exports.Writer = Writer;
	exports.ZipReader = ZipReader;
	exports.ZipWriter = ZipWriter;
	exports.configure = configure;
	exports.fs = fs;
	exports.getMimeType = getMimeType;
	exports.initShimAsyncCodec = streamCodecShim;
	exports.terminateWorkers = terminateWorkers;

	Object.defineProperty(exports, '__esModule', { value: true });

}));