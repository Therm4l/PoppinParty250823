import pandas as pd
import json

# --- 配置区：请在这里修改你的文件名 ---

# 你的 Excel 文件名
excel_file_path = 'assets/data/popipa上海公演神秘企划（收集结果）.xlsx' 
# 你希望生成的 JSON 文件名
json_file_path = 'assets/data/message_board.json'

# --- 代码正文：通常无需修改以下内容 ---

def convert_excel_to_json(excel_path, json_path):
    """
    读取 Excel 文件，提取指定列，并转换为特定格式的 JSON 文件。
    """
    try:
        # 读取 Excel 文件
        # 使用 dtype=str 确保所有数据都以字符串形式读取，避免数字被识别为整数或浮点数
        df = pd.read_excel(excel_path, dtype=str)
        
        # 定义 Excel 中需要提取的列名
        id_column = 'id（必填）'
        words_column = '祝贺寄语（必填）'

        # 检查必需的列是否存在
        if id_column not in df.columns or words_column not in df.columns:
            print(f"错误：Excel 文件中缺少必需的列。")
            print(f"请确保表头包含 '{id_column}' 和 '{words_column}'。")
            return

        # 初始化一个列表来存放所有记录
        json_data = []

        # 遍历 DataFrame 的每一行
        for index, row in df.iterrows():
            # 提取 'id' 和 '祝贺寄语' 列的数据
            author_text = row[id_column]
            words_text = row[words_column]

            # 检查数据是否为空或无效 (pandas 读取的空单元格可能是 None 或 NaN)
            if pd.isna(author_text) or pd.isna(words_text) or not str(author_text).strip() or not str(words_text).strip():
                # +2 是因为 index 从0开始，且Excel有表头行
                print(f"警告：跳过第 {index + 2} 行，因为 'id' 或 '祝贺寄语' 为空。")
                continue

            # 创建符合目标格式的字典
            record = {
                "words": str(words_text).strip(),
                "author": str(author_text).strip()
            }
            
            # 将记录添加到列表中
            json_data.append(record)

        # 将列表写入 JSON 文件
        # 使用 'w' 模式（写入），encoding='utf-8' 以正确处理中文
        # ensure_ascii=False 确保中文字符直接写入，而不是作为编码
        # indent=4 使 JSON 文件格式优美，易于阅读
        with open(json_path, 'w', encoding='utf-8') as json_file:
            json.dump(json_data, json_file, ensure_ascii=False, indent=4)

        print(f"成功！ {len(json_data)} 条记录已从 '{excel_path}' 转换并保存到 '{json_path}'。")

    except FileNotFoundError:
        print(f"错误：找不到文件 '{excel_path}'。请确保文件名正确，且文件与脚本在同一目录下。")
    except Exception as e:
        print(f"发生未知错误: {e}")

# --- 运行转换 ---
if __name__ == "__main__":
    convert_excel_to_json(excel_file_path, json_file_path)

