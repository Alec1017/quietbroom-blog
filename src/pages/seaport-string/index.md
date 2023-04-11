---
title: Seaport's Infamous _name() Function
date: "2022-06-07"
intro: "How a seemingly over-engineered function unlocks hidden meanings about Solidity and ABI encodings"
---

Recently, I've been doing a bit of research into [Huff](https://docs.huff.sh/), a language for writing smart contracts with direct access to EVM bytecode. One of the things I found most interesting about Huff is the classic "Hello, world!" example that most coders use when venturing into any new programming language is actually quite complicated to pull off. 

A Huff "Hello, world!" requires a bit of knowledge about how dynamic strings are encoded in the ABI standard, and the process of learning it helped me to cement a few concepts about Solidity that I always *told* but never understood *why* they were so.

Surpisingly, a form of Huff's "Hello, world!" example was implemented in Solidity by developers at OpenSea in their Seaport protocol. 

Seaport is OpenSea's latest marketplace protocol for buying and selling NFTs. It's been making the rounds on twitter lately because of how gas-optimized each contract is. In particular, [this](https://github.com/ProjectOpenSea/seaport/blob/fb1c3bf4c25a32ae90f776652a8b2b07d5df52cf/contracts/Seaport.sol#L95-L108) function has been getting a lot of attention since it returns a constant string using inline assembly. 

Why intentionally create a function like this? Why not just define something like:

```solidity
string constant name = "Seaport";
```

Hopefully I can reveal some interesting insights into how string encodings work, why the OpenSea developers chose to implement a function that returns a string in this way, and what this means for the storage of constant values in Solidity. 

### How are dynamic strings encoded?

Strings are dynamic in Solidity, meaning they can have an arbitrary size. This makes them tricky to use in the EVM where memory is stored using uniform 32 byte chunks, raising all sorts of questions. I remember thinking: *How does the EVM know how many 32 byte words my string spans across?*

A string like `"Seaport"` cannot just be converted to bytes and stored. If that were the case then all strings would be limited to a character length of 32, since UTF-8 encoding converts a single character into 1 byte of hex data. 

Instead, the ABI encoding standard chops up a string into 3 distinct parts, with each being a 32 byte chunk stored in memory.

    1. The memory location of the start of the string data
    2. The length of the string
    3. The UTF-8 encoded string data

An encoding for the string `"Seaport"` in a 96 byte-long section of memory will look like this:


```
Location    Data
0x00        0000000000000000000000000000000000000000000000000000000000000020
0x20        0000000000000000000000000000000000000000000000000000000000000007
0x40        536561706f727400000000000000000000000000000000000000000000000000
```

In memory chunk `0x00`, we read the value `0x20` which indicates that the string data begins at byte number `0x20`. In this case, `0x20` is just the next 32 byte chunk over from the first, but in other cases (such as arrays of strings) the start of the string data can be much farther away. One caveat to note is that "string data" is considered to be the length of the string and the actual encoded characters of the string. So in the example above, "string data" is chunks 2 and 3.

Memory chunk `0x20` has a single byte value of `0x0d` which indicates the total length of the characters of the string are 13 bytes long. This allows the EVM to know when to stop reading bytes that are related to this string, and allows a single string to safely span multiple 32 byte chunks. 

Memory chunk `0x40` contains the UTF-8 encoded characters of the string. Because the data in this chunk is byte data that can span multiple chunks, it is padded with zeroes to the right. 

So now, all we need to do is look at the first chunk and we'll know where to find the data we're interested in, and how long that data is. This scheme requires storing 3 separate chunks into memory, and at the time of writing, each [MSTORE](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) operation in the EVM costs at least 3 gas. 9 gas total isn't too bad.

But, can we do better?

### A gas-optimized Solidity constant 

The Seaport protocol manages to implement the `_name()` function which returns a constant string value, using only 2 `MSTORE` calls. The key insight that makes the optimization work is that the numerical length data in chunk 2 is padded to the left and the byte data on chunk 3 is padded to the right. 

If we were to combine the 3 chunks into one, it would look like this:
```
00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000007536561706f727400000000000000000000000000000000000000000000000000
```

Notice how the `0x07` ("Seaport" has a length of 7) and `536561706f7274` (UTF-8 encoding of "Seaport") push up against each other? The `_name()` function reformats the chunks in such a way that only 2 `MSTORE` calls are needed.

To do this, we store the offset data at memory location `0x00` with a value of `0x20` as usual. The value of our second chunk will be `0x07536561706f7274` at memory location `0x27` which is the length of the string combined with the encoding of the string itself.
```
Location    Data
0x00        0000000000000000000000000000000000000000000000000000000000000020
0x20        00000000000000
0x27        00000000000000000000000000000000000000000000000007536561706f7274
```

Instead of putting the second chunk at memory location `0x20`, which would directly follow the first chunk, we offset it to the right by the length of the string we're storing. So, we'll store the second chunk at location `0x20` plus `0x07` to get `0x27`. Since `MSTORE` pads `0x07536561706f7274` to the left as a full 32 byte chunk, this causes the right-most 7 bytes to *bleed* into the next chunk of 32 bytes. 

When reading the data as one contiguous piece of memory with a length of 96 bytes, it takes its original form as if we had stored the string with 3 `MSTORE` calls.

```
0x00                                                             0x20          0x27                                               0x40                                                             0x60 
|                                                                |             |                                                  |                                                                |
|0000000000000000000000000000000000000000000000000000000000000020|0000000000000|00000000000000000000000000000000000000000000000007|536561706f727400000000000000000000000000000000000000000000000000|
|                                                                |             |                                                  |                                                                |
|                                                                |_____________|                                                  |                                                                |
                                                                        |
                                                            these 7 bytes are skipped

```

### Wrap up

I was always told that constant values are never put in storage, but I never knew where they lived, if not in storage. What I found most interesting about this little rabbit hole was that it made me realize what constant values actually *are* in Solidity.

They're just separate functions that are given steps to push bytecode into memory and then return it when called for.