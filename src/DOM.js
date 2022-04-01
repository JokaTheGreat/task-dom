/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.innerHTML = content;
        document.body.append(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    if (level == 0) {
        return null;
    }

    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', `item_1`);

    const divParents = [rootDiv];
    let levelShift = 0;

    for (let i = 2; i <= level; i++) {
        for (let j = 0; j < childrenCount ** (i - 1); j++) {
            const div = document.createElement('div');
            div.setAttribute('class', `item_${i}`);
            divParents[levelShift + Math.floor(j / childrenCount)].append(div);

            divParents.push(div);
        }
        levelShift += childrenCount ** (i - 2);
    }

    return rootDiv;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const divTree = generateTree(2, 3);
    const newTree = divTree.cloneNode();

    const secondItems = divTree.getElementsByClassName('item_2');

    for (let i = 0; i < secondItems.length; i++) {
        const newItem = document.createElement('section');
        newItem.setAttribute('class', 'item_2');
        newItem.innerHTML = secondItems[i].innerHTML;
        newTree.append(newItem);
    }

    return newTree;
}
